import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { AuthController } from './auth.controller';
import { AuthService, expireSec } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

// TODO: hide secret jwt somewhere
// LATER: potentially use PEM-encoded public key instead? -> research

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'proflow_jwt_key',
    signOptions: { expiresIn: expireSec },
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, TypeOrmModule],
})
export class AuthModule {}
