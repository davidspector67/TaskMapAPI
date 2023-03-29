import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card, Project, ProjectColumn, SubProject, User } from '../database/entities';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, SubProject, Card, ProjectColumn])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}