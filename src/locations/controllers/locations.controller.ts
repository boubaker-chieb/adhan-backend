import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { LocationsService } from '../providers/locations.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
@ApiTags('locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locations: LocationsService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new location',
    description: 'Creates a new location for the authenticated user.',
  })
  @ApiBody({ type: CreateLocationDto, description: 'Location data' })
  @ApiResponse({
    status: 201,
    description: 'Location created successfully.',
    // type: LocationDto, // Uncomment and create if you want to document the response model
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@GetUser('userId') userId: string, @Body() dto: CreateLocationDto) {
    return this.locations.create(userId, dto);
  }
  @Get()
  @ApiOperation({
    summary: 'List all locations for the user',
    description: 'Returns all locations for the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of locations returned successfully.',
    // type: [LocationDto], // Uncomment and create if you want to document the response model
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  list(@GetUser('userId') userId: string) {
    return this.locations.list(userId);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a location by ID',
    description: 'Deletes a location by its ID for the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Location ID',
    example: 'abc123',
  })
  @ApiResponse({
    status: 200,
    description: 'Location deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@GetUser('userId') userId: string, @Param('id') id: string) {
    return this.locations.remove(userId, id);
  }
}
