import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PrefsService } from '../providers/prefs.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UpdatePrefsDto } from '../dto/update-prefs.dto';

@ApiTags('prefs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prefs')
export class PrefsController {
  constructor(private readonly prefs: PrefsService) {}
  @Get()
  @ApiOperation({
    summary: 'Get user preferences',
    description: 'Returns the preferences for the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User preferences returned successfully.',
    type: UpdatePrefsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  get(@GetUser('userId') userId: string) {
    return this.prefs.get(userId);
  }
  @Patch()
  @ApiOperation({
    summary: 'Update user preferences',
    description: 'Updates the preferences for the authenticated user.',
  })
  @ApiBody({ type: UpdatePrefsDto, description: 'Preferences data to update.' })
  @ApiResponse({
    status: 200,
    description: 'User preferences updated successfully.',
    type: UpdatePrefsDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@GetUser('userId') userId: string, @Body() dto: UpdatePrefsDto) {
    return this.prefs.update(userId, dto);
  }
}
