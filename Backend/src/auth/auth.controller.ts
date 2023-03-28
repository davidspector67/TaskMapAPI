import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dtos/request.entities';
import { ApiTags } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities';

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
  async login(@Body() userInfo:  LoginRequest): Promise<LoginResponse> {
    const user = await this.authService.validateUser(userInfo);
    if (!user)
      return null;

    return this.authService.userAuth(user);
  }
}

  // @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// @Post("refresh")
	// async auth_refresh(@AuthUser() user: User): Promise<LoginResponse> {
	// 	const jwt = await this.authService.login(user);
  //   console.log()
	// 	return { jwt, guid: user.guid, expireSec };
	// }