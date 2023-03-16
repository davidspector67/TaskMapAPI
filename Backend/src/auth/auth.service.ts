import { Injectable } from '@nestjs/common';
import { Login } from './dtos/login.model';

@Injectable()
export class AuthService {
  private logins: Login[] = [];

  signUp(userInfo: Login) {
    this.logins.push(userInfo);
    return userInfo.username + " successfully signed up!";
  }

  getUsers(): Login[] {
    return this.logins.slice();
  }

  login(userInfo: Login): string {
    if (this.logins.filter(existing => existing.username === userInfo.username && existing.password === userInfo.password).length > 0)
      return userInfo.username + " successfully logged in!"
    return "Login info not found";
  }
}
