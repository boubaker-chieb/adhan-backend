import { IsLatitude, IsLongitude, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLocationDto {
  @ApiProperty({
    type: String,
    description: 'Location name (e.g. "Home")',
  })
  @IsString()
  name: string; // e.g. "Home"
  @ApiProperty({
    type: Number,
    description: 'Latitude',
  })
  @IsLatitude()
  latitude: number;
  @ApiProperty({
    type: Number,
    description: 'Longitude',
  })
  @IsLongitude()
  longitude: number;
  @ApiProperty({
    type: String,
    description: 'Timezone (IANA, e.g. "Europe/Paris")',
  })
  @IsString()
  timezone: string; // IANA, e.g. "Europe/Paris"
}
