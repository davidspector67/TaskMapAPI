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
  signUp(@Body() userInfo: Login): string {
    return this.authService.signUp(userInfo);
  }

  @Get('getUsers')
  getUsers(): any {
    return this.authService.getUsers()
  }

  @Post('login')
  login(@Body() userInfo: Login): string {
    return this.authService.login(userInfo);
  }
}