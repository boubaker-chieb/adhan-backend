import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: SignupDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Email already in use');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, passwordHash, name: dto.name },
    });
    // Create default prefs
    await this.prisma.prefs.create({ data: { userId: user.id } });
    const tokens = await this.signTokens(user.id, user.email);
    await this.saveRefresh(user.id, tokens.refreshToken);
    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.signTokens(user.id, user.email);
    await this.saveRefresh(user.id, tokens.refreshToken);
    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }
  async refresh(refreshToken: string) {
    // verify and also match DB copy
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = this.jwt.verify(refreshToken, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    const dbUser = await this.prisma.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: { id: payload.sub },
    });
    if (!dbUser || dbUser.refreshToken !== refreshToken)
      throw new UnauthorizedException('Invalid refresh');
    const tokens = await this.signTokens(dbUser.id, dbUser.email);
    await this.saveRefresh(dbUser.id, tokens.refreshToken);
    return tokens;
  }
  private async saveRefresh(userId: string, token: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: token,
      },
    });
  }
  private async signTokens(sub: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { sub, email },
        {
          secret: this.config.get('JWT_ACCESS_SECRET'),
          expiresIn: `${this.config.get('JWT_ACCESS_TTL')}s`,
        },
      ),
      this.jwt.signAsync(
        { sub, email },
        {
          secret: this.config.get('JWT_REFRESH_SECRET'),
          expiresIn: `${this.config.get('JWT_REFRESH_TTL')}s`,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
