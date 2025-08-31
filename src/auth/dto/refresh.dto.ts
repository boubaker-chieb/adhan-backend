import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class RefreshDto {
  @ApiProperty({
    description: 'The refresh token of the user',
    example: 'some-refresh-token',
    required: true,
  })
  @IsString()
  refreshToken: string;
}
