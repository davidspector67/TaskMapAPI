import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dtos/login.model';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { validate } from 'class-validator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userInfo: Login): Promise<Boolean> {
    return this.authService.signUp(userInfo);
  }

  @Get('getUsers')
  async getUsers(): Promise<String[]> {
    return this.authService.getUsers()
  }

  @Post('login')
  async login(@Body() userInfo: Login): Promise<Boolean> {
    return this.authService.login(userInfo);
  }
}