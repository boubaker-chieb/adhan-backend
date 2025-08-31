import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CalcMethod, HighLatRule, LatAdjMethod, Madhab } from '@prisma/client';
export class UpdatePrefsDto {
  @ApiPropertyOptional({
    enum: CalcMethod,
    description: 'Calculation method',
  })
  @IsOptional()
  @IsEnum(CalcMethod)
  calcMethod?: CalcMethod;
  @ApiPropertyOptional({
    enum: Madhab,
    description: 'Madhab (school of thought)',
  })
  @IsOptional()
  @IsEnum(Madhab)
  madhab?: Madhab;
  @ApiPropertyOptional({
    enum: HighLatRule,
    description: 'High latitude rule',
  })
  @IsOptional()
  @IsEnum(HighLatRule)
  highLatRule?: HighLatRule;
  @ApiPropertyOptional({
    enum: LatAdjMethod,
    description: 'Latitude adjustment method',
  })
  @IsOptional()
  @IsEnum(LatAdjMethod)
  latitudeAdjustment?: LatAdjMethod;
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Use moonsighting',
  })
  @IsOptional()
  @IsBoolean()
  useMoonsighting?: boolean;
}
