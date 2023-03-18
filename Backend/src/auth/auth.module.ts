import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserData } from 'src/database/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserData])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
