import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/database/entities';
import { LoginRequest, LoginResponse } from './dtos/request.entities';
import { ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'proflow_jwt_key',
    });
  }

  // TODO: make payload datatype
  async validate(payload: any): Promise<User> {
    const guid = payload.sub;
    const user = await this.authService.findUserFromGuid(guid);
    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    return user;

  }
}