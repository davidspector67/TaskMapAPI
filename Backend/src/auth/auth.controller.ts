import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dtos/login.model';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { validate } from 'class-validator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() userInfo: Login): string {
    const hi: Login = {username:"", password:"hi"};
    return this.authService.signUp(userInfo);
  }

  @Get()
  getUsers(): any {
    return this.authService.getUsers()
  }
}