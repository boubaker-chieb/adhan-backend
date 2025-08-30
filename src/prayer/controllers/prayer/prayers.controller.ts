import { Controller, Get, Query } from '@nestjs/common';
import { PrayersService } from 'src/prayer/services/prayers.service';

@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}
  @Get()
  getPrayerTimes(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('date') date?: string,
  ) {
    return this.prayersService.getPrayerTimes(
      parseFloat(lat),
      parseFloat(lng),
      date ? new Date(date) : new Date(),
    );
  }
}
