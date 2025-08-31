import { ApiProperty } from '@nestjs/swagger';

class PrayerTimesMeta {
  @ApiProperty({ example: 'MuslimWorldLeague', description: 'Calculation method used' })
  method: string;

  @ApiProperty({ example: 'Shafi', description: 'Madhab used for Asr calculation' })
  madhab: string;

  @ApiProperty({ example: 'MiddleOfTheNight', description: 'High latitude rule applied' })
  highLatRule: string;

  @ApiProperty({ example: 'None', description: 'Latitude adjustment method' })
  latitudeAdjustment: string;

  @ApiProperty({ example: 36.8065, description: 'Latitude of the location' })
  latitude: number;

  @ApiProperty({ example: 10.1815, description: 'Longitude of the location' })
  longitude: number;

  @ApiProperty({ example: 'Africa/Tunis', description: 'Timezone of the location' })
  timezone: string;
}

export class PrayerTimesResponse {
  @ApiProperty({ example: '2025-08-31T04:00:00+01:00', description: 'ISO date in target timezone' })
  date: string;

  @ApiProperty({ example: '04:30', nullable: true, description: 'Fajr prayer time' })
  fajr: string | null;

  @ApiProperty({ example: '06:00', nullable: true, description: 'Sunrise time' })
  sunrise: string | null;

  @ApiProperty({ example: '12:30', nullable: true, description: 'Dhuhr prayer time' })
  dhuhr: string | null;

  @ApiProperty({ example: '16:00', nullable: true, description: 'Asr prayer time' })
  asr: string | null;

  @ApiProperty({ example: '19:00', nullable: true, description: 'Maghrib prayer time' })
  maghrib: string | null;

  @ApiProperty({ example: '20:30', nullable: true, description: 'Isha prayer time' })
  isha: string | null;

  @ApiProperty({ example: 120.5, description: 'Qibla direction in degrees from North' })
  qiblaDirection: number;

  @ApiProperty({ type: PrayerTimesMeta })
  meta: PrayerTimesMeta;
}
