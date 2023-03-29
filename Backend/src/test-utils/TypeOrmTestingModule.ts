import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmTestingModule = (entities: any[]) => 
    TypeOrmModule.forRoot({
        type: 'mysql',
        database: "taskmap_test",
        username: "root",
        password: "password",
        host: process.env.TEST_DATABASE_HOST,
        entities: [...entities],
        synchronize: true,
        port: 3306,
    });