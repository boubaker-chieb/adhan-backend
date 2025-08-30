import { Module } from '@nestjs/common';
import { PrayersService } from './services/prayers.service';
import { PrayersController } from './controllers/prayer/prayers.controller';

@Module({
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayerModule {}
