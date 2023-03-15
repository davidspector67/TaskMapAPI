import { Injectable } from '@nestjs/common';
import { Login } from './login.model';

@Injectable()
export class AuthService {
  private logins: Login[] = [];

  signUp(userInfo: Login) {
    this.logins.push(userInfo);
    return userInfo.username + " successfully logged in!";
  }

  getUsers(): Login[] {
    return this.logins.slice();
  }
}
