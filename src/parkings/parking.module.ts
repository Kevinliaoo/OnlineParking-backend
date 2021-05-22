// Nestjs
import { Module } from '@nestjs/common';

// Controllers
import { ParkingsController } from './controllers/parkings.controller';
// Services
import { ParkingsService } from './services/parkings.service';
// Guards
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Module({
    controllers: [ParkingsController], 
    providers: [ParkingsService],
    imports: [JwtAuthGuard]
})
export class ParkingModule {}
