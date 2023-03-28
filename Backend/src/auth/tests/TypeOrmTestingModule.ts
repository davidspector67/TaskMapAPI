import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../database/entities";

export const TypeOrmTestingModule = (entities: any[]) => 
    TypeOrmModule.forRoot({
        type: 'mysql',
        database: 'taskmap_test',
        username: 'root',
        password: 'password',
        host: 'localhost',
        entities: [...entities],
        synchronize: true,
        port: 3306,
    });

// imports: [AuthModule, ProjectsModule, TypeOrmModule.forRoot({
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'password',
//     database: 'taskmap',
//     entities: [User, Project],
//     synchronize: true,