import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/database/entities';
import { LoginRequest } from './dtos/request.entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userInfo : LoginRequest): Promise<User> {
    const user = await this.authService.validateUser(userInfo);
    if (!user) {
      throw new UnauthorizedException(userInfo.username + " not found in validation!");
    }
    return user;
  }
}
