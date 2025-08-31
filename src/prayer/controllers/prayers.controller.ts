import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PrayersService } from 'src/prayer/providers/prayers.service';

@ApiTags('prayers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}
  @Get()
  @ApiOperation({
    summary: 'Get prayer times for a location and date',
    description:
      'Returns prayer times for the specified latitude, longitude, and date. Requires authentication.',
  })
  @ApiQuery({
    name: 'lat',
    type: String,
    description: 'Latitude',
    required: true,
    example: '48.8566',
  })
  @ApiQuery({
    name: 'lng',
    type: String,
    description: 'Longitude',
    required: true,
    example: '2.3522',
  })
  @ApiQuery({
    name: 'date',
    type: String,
    description: 'Date (YYYY-MM-DD)',
    required: false,
    example: '2025-08-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Prayer times returned successfully.',
    // type: PrayerTimesDto, // Uncomment and create if you want to document the response model
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
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
