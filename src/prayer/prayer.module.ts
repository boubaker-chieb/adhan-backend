import { Module } from '@nestjs/common';
import { PrayersService } from './providers/prayers.service';
import { PrayersController } from './controllers/prayers.controller';

@Module({
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayerModule {}
