import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Project, User } from './database/entities';
import { ProjectsModule } from './projects/projects.module';


@Module({
  imports: [AuthModule, ProjectsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'taskmap',
    entities: [User, Project],
    synchronize: true,
  }),
  // }), TestModule,
],
})
export class AppModule {}
