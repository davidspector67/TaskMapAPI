import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserData } from 'src/database/entities';
import { Repository } from 'typeorm';
import { Login } from './dtos/login.model';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserData) private userRepository: Repository<UserData>,) {}

  async signUp(userInfo: Login): Promise<Boolean> {
    if (await this.userRepository.findOne({ where: { username: userInfo.username } })) {
      console.log("Account with this username already exists! Try a different username.")
      return null;
    }
    this.userRepository.save(userInfo);
    console.log(userInfo.username + " successfully signed up!");
    return true;
  }

  async getUsers(): Promise<String[]> {
    const users = await this.userRepository.find({select: {username: true}});
    return users.map(user => user.username);
  }

  async login(userInfo: Login): Promise<Boolean> {
    if (await this.userRepository.findOne({ where: { username: userInfo.username, password: userInfo.password } })) {
      console.log(userInfo.username + " successfully logged in!")
      return true;
    }
    console.log("Incorrect username or password!")
    return null;
  }
}
