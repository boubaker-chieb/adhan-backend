import { Module } from '@nestjs/common';
import { PrayerModule } from './prayer/prayer.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PrefsModule } from './prefs/prefs.module';
import { LocationsModule } from './locations/locations.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/providers/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ConfigModule.forRoot(),
    PrayerModule,
    UsersModule,
    CommonModule,
    AuthModule,
    PrefsModule,
    LocationsModule,
    PrismaModule,
  ],
})
export class AppModule {}
