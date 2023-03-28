import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Project, User } from '../database/entities';
import { ProjectProposal, ProjectTitleRequest } from './dtos/project.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private projects: Repository<Project>) {}

  async createProject(projectProposal: ProjectProposal, user: User): Promise<Project> {
    const existingProject = await this.projects.findOne({ where: {title: projectProposal.title, owner: user }, relations: {owner: true}});
    
    if (existingProject) {
      console.log("Project title already exists");
      return null;
    }

    const newProject = await this.projects.save({ title: projectProposal.title, description: projectProposal.description, owner: user });
    console.log(projectProposal.title + " created successfully");
    return newProject;
  }
	

  async getProjects(user: User): Promise<Project[]> {
    return await this.projects.find({ where: { owner: user } , relations: { owner: true}});
  }

  async deleteProject(titleRequest: ProjectTitleRequest, user: User) : Promise<boolean> {
    const existingProject = await this.projects.findOne({where: { title: titleRequest.title, owner: user }, relations: {owner: true}});
    if (existingProject) {
      await this.projects.delete({ guid: existingProject.guid });
      console.log(titleRequest.title + " deleted successfully");
      return true;
    }
    return null;
  }
}
