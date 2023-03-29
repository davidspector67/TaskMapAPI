import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Project, SubProject, User, Card, ProjectColumn } from './database/entities';
import { ProjectsModule } from './projects/projects.module';
import { SubProjectsModule } from './subProjects/subProjects.module';


@Module({
  imports: [AuthModule, ProjectsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'taskmap',
    entities: [User, Project, SubProject, Card, ProjectColumn],
    synchronize: true,
  }), SubProjectsModule,
],
})
export class AppModule {}
