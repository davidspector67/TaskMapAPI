import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './dtos/project.model';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { validate } from 'class-validator';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly authService: ProjectsService) {}

//   @Post('createNew')
//   signUp(@Body() userInfo: Project): string {
//     // return this.authService.signUp(userInfo);
//   }

  @Get('getUsers')
  getUsers(): any {
    return this.authService.getUsers()
  }

//   @Post('login')
//   login(@Body() userInfo: Project): string {
//     // return this.authService.login(userInfo);
//   }
}