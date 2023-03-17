import { Injectable } from '@nestjs/common';
import { Project } from './dtos/project.model';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  createNew(projectInfo: Project): string {
    if (this.projects.filter(project => project.title === projectInfo.title).length > 0)
        return "Project title already exists";
    this.projects.push(projectInfo);
    return projectInfo.title + " successfully created!";
  }

  getProjects(): Project[] {
    return this.projects.slice();
  }

  getProjectDescription(title: string) : string {
    const project = this.projects.find(project => project.title === title)
    if (!project)
        return "Project not found."
    return project.description;
  }

//   login(userInfo: Project): string {
//     if (this.logins.filter(existing => existing.username === userInfo.username && existing.password === userInfo.password).length > 0)
//       return userInfo.username + " successfully logged in!"
//     return "Login info not found";
//   }
}
