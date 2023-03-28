import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities';
import { Repository } from 'typeorm';
import { LoginRequest, LoginResponse } from './dtos/request.entities';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

//TODO: put global variables, port numbers, etc into env.ts. Or maybe use module/namespace if that makes sense
export const expireSec = 60000;

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

  async signUp(userInfo: LoginRequest): Promise<User> {
    userInfo.username = userInfo.username.toLowerCase();
    if (await this.userRepository.findOne({ where: { username: userInfo.username } })) {
      console.log("Account with this username already exists! Try a different username.")
      return null;
    }
    const user = await this.userRepository.save(userInfo);
    console.log(userInfo.username + " successfully signed up!");
    return user;
  }

  async login(user: User): Promise<string> {
    const payload = { sub: user.guid }; // sub -> consistency w JWT standards
    return this.jwtService.sign(payload);
}

  async userAuth(user: User): Promise<LoginResponse> {
    const jwt = await this.login(user);
    return { jwt: jwt, guid: user.guid, expireSec: expireSec, }
  }

  async validateUser(userInfo: LoginRequest): Promise<User> {
    userInfo.username = userInfo.username.toLowerCase();
    const user = await this.userRepository.find({ where: { username: userInfo.username } });
    
    if (user.length > 1)
      throw new NotAcceptableException('Multiple users exist with same username!')
    if (!user.length) {
      console.log('User does not exist');
      return null;
    }
    
    const passwordValid = await bcrypt.compare(userInfo.password, user[0].password)
    if (user && passwordValid ) 
      return user[0];
    console.log('Incorrect password');
    return null;
}

  async findUserFromGuid(guid: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { guid: guid }})
    return user;
  }

}
