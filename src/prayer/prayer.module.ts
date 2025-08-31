import { Module } from '@nestjs/common';
import { PrayersService } from './providers/prayers.service';
import { PrayersController } from './controllers/prayers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrayerGateway } from './providers/prayer.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [PrayersController],
  providers: [PrayersService, PrayerGateway],
})
export class PrayerModule {}
