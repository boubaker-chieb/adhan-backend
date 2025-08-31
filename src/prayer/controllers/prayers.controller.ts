import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { PrayerTimesResponse } from '../types/prayers-time-response.type';
import { PrayersService } from '../providers/prayers.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@ApiTags('Prayers')
@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayers: PrayersService) {}
  // Works with or without auth; if authed, uses saved prefs automatically
  @Get()
  @ApiOperation({
    summary: 'Get prayer times',
    description: 'Returns prayer times for a given location and date. If authenticated, uses saved preferences automatically.'
  })
  @ApiQuery({ name: 'lat', required: false, type: Number, description: 'Latitude of the location', example: 36.8065 })
  @ApiQuery({ name: 'lon', required: false, type: Number, description: 'Longitude of the location', example: 10.1815 })
  @ApiQuery({ name: 'date', required: false, type: String, description: 'Date in YYYY-MM-DD format (defaults to today)', example: '2025-08-31' })
  @ApiQuery({ name: 'locationId', required: false, type: String, description: 'Location ID (if using a saved location)', example: 'loc_12345' })
        @ApiResponse({
          status: 200,
          description: 'Prayer times response',
          schema: { $ref: getSchemaPath(PrayerTimesResponse) },
          examples: {
            success: {
              summary: 'Example response',
              value: {
                date: '2025-08-31T04:00:00+01:00',
                fajr: '04:30',
                sunrise: '06:00',
                dhuhr: '12:30',
                asr: '16:00',
                maghrib: '19:00',
                isha: '20:30',
                qiblaDirection: 120.5,
                meta: {
                  method: 'MuslimWorldLeague',
                  madhab: 'Shafi',
                  highLatRule: 'MiddleOfTheNight',
                  latitudeAdjustment: 'None',
                  latitude: 36.8065,
                  longitude: 10.1815,
                  timezone: 'Africa/Tunis',
                }
              }
            }
          }
        })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async get(
    @GetUser('userId') userId: string | null,
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
    @Query('date') date?: string,
    @Query('locationId') locationId?: string,
  ): Promise<PrayerTimesResponse> {
    return this.prayers.getFor(userId ?? null, {
      lat: lat != null ? Number(lat) : undefined,
      lon: lon != null ? Number(lon) : undefined,
      date,
      locationId,
    });
  }
}
