import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Project, SubProject, User, Card, ProjectColumn } from './database/entities';
import { ProjectsModule } from './projects/projects.module';
import { SubProjectsModule } from './subProjects/subProjects.module';

@Module({
  imports: [AuthModule, ProjectsModule,  SubProjectsModule, ConfigModule.forRoot({
    envFilePath: '../.env',
    isGlobal: true,
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Project, SubProject, Card, ProjectColumn],
    synchronize: true,
  }),
],
})
export class AppModule {}
