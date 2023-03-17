import { Injectable } from '@nestjs/common';
import { Project } from './dtos/project.model';

@Injectable()
export class ProjectsService {
  private logins: Project[] = [];

//   signUp(userInfo: Project) {
//     this.logins.push(userInfo);
//     return userInfo.username + " successfully signed up!";
//   }

  getUsers(): Project[] {
    return this.logins.slice();
  }

//   login(userInfo: Project): string {
//     if (this.logins.filter(existing => existing.username === userInfo.username && existing.password === userInfo.password).length > 0)
//       return userInfo.username + " successfully logged in!"
//     return "Login info not found";
//   }
}
