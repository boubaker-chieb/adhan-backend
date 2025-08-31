import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePrefsDto } from '../dto/update-prefs.dto';

@Injectable()
export class PrefsService {
  constructor(private prisma: PrismaService) {}
  get(userId: string) {
    return this.prisma.prefs.findUnique({
      where: {
        userId,
      },
    });
  }
  update(userId: string, dto: UpdatePrefsDto) {
    return this.prisma.prefs.update({ where: { userId }, data: dto });
  }
}
