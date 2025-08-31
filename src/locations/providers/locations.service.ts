import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from '../dto/create-location.dto';
@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}
  create(userId: string, dto: CreateLocationDto) {
    return this.prisma.location.create({ data: { userId, ...dto } });
  }
  list(userId: string) {
    return this.prisma.location.findMany({ where: { userId } });
  }
  remove(userId: string, id: string) {
    return this.prisma.location.delete({ where: { id, userId } }).catch(() => {
      throw new NotFoundException();
    });
  }
}
