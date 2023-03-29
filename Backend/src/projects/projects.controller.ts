import { Controller, Post, Get, Body, Param, ForbiddenException, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectProposal, ProjectTitleRequest } from './dtos/project.model';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, validate } from 'class-validator';
import { AuthUser, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Project, SubProject, User } from '..//database/entities';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor( private readonly projectService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  async create(@AuthUser() user: User, @Body() projectProposal: ProjectProposal): Promise<Project> {
    return await this.projectService.createProject(projectProposal, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('getProjects')
  async getProjects(@AuthUser() user: User): Promise<Project[]> {
    return await this.projectService.getProjects(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('delete')
  async delete(@AuthUser() user: User, @Body() title: ProjectTitleRequest): Promise<boolean> {
    return await this.projectService.deleteProject(title, user);
  }

  // @Get(':title')
  // getProjectDescription(@Param('title') title: string): string {
  //   return this.projectService.getProjectDescription(title);
  // }
}