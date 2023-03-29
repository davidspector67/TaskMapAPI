import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card, Project, ProjectColumn, SubProject, User } from '../database/entities';
import { SubProjectsController } from './subProjects.controller';
import { SubProjectsService } from './subProjects.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Project, SubProject, Card, ProjectColumn])],
    controllers: [SubProjectsController],
    providers: [SubProjectsService],
})
export class SubProjectsModule {}
