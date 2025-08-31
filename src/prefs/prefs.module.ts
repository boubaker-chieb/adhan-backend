import { Module } from '@nestjs/common';
import { PrefsController } from './controllers/prefs.controller';
import { PrefsService } from './providers/prefs.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrefsController],
  providers: [PrefsService],
})
export class PrefsModule {}
