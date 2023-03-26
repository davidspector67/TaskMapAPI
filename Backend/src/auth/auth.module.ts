import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { AuthController } from './auth.controller';
import { AuthService, expireSec } from './auth.service';


@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'proflow_jwt_key',
    signOptions: { expiresIn: expireSec },
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
