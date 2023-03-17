import { Controller, Post, Get, Body, Param, ForbiddenException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './dtos/project.model';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, validate } from 'class-validator';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('create')
  create(@Body() projectInfo: Project): string {
    return this.projectService.createNew(projectInfo);
  }

  @Get('getprojects')
  getProjects(): any {
    return this.projectService.getProjects();
  }

  @Get(':title')
  getProjectDescription(@Param('title') title: string): string {
    return this.projectService.getProjectDescription(title);
  }
}