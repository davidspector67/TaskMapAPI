import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './login.model';
import { ApiBearerAuth, ApiTags, ApiBody } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
//   @ApiBody('username')
//   @ApiBearerAuth()
  signUp(@Body() userName: string, @Body() password: string): string {
    return this.authService.signUp(new Login(userName, password));
  }

  @Get()
  getUsers(): any {
    return this.authService.getUsers()
  }
}