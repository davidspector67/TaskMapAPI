import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

// TODO: hide secret jwt somewhere
// LATER: potentially use PEM-encoded public key instead? -> research

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]), 
  ConfigModule.forRoot({
    envFilePath: '../.env',
    isGlobal: true,
  }), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRE_SEC) },
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, TypeOrmModule],
})
export class AuthModule {}
