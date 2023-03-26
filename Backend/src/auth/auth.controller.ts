import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dtos/request.entities';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities';
import { JwtAuthGuard, AuthUser } from "./jwt.auth.guard";

// TODO: make this global variable somewhere
// In global variables file, also put ports and secret key there

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userInfo: LoginRequest): Promise<LoginResponse> {
    const salt = await bcrypt.genSalt();
    userInfo.password = await bcrypt.hash(userInfo.password, salt);
    const user: User = await this.authService.signUp(userInfo);
    
    if (!user)
      return null;
    
    return this.authService.userAuth(user);
  }

  @Post('login')
  async login(@Body() userInfo: LoginRequest): Promise<LoginResponse> {
    const user = await this.authService.validateUser(userInfo);

    if (!user)
      return null;

    return this.authService.userAuth(user);

  }
}