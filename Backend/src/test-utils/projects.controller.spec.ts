import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, Project, SubProject, Card, ProjectColumn } from "../database/entities";
import { ProjectsController } from "../projects/projects.controller";
import { ProjectsService } from "../projects/projects.service";
import { expireSec } from "../auth/auth.service";
import { ProjectProposal, ProjectTitleRequest } from "../projects/dtos/project.model";
import { AuthService } from "../auth/auth.service";
import { TypeOrmTestingModule } from "./TypeOrmTestingModule";
import { AuthController } from "../auth/auth.controller";

// Current test database contains one user with:
// - username: firstUser
// - password: hiThere

describe('ProjectsController', () => {
    let projectsController: ProjectsController;
    let projectsService: ProjectsService;
    let authService: AuthService;
    let user: User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmTestingModule([User, Project, SubProject, Card, ProjectColumn]), 
                TypeOrmModule.forFeature([User, Project, SubProject, Card, ProjectColumn]),
            ],
            controllers: [ProjectsController, AuthController],
            providers: [ProjectsService, AuthService, JwtService],
        }).compile();

        // jwtService = new JwtService();
        projectsService = module.get<ProjectsService>(ProjectsService);
        projectsController = new ProjectsController(projectsService);
        authService = module.get<AuthService>(AuthService);
        user = await authService.validateUser({username: 'firstUser', password: 'hiThere'});
    });

    it('should be defined', () => {
        expect(projectsController).toBeDefined();
    });

    describe('create', () => {
        it('project already exists error', async () => {
            const request = {title: 'firstProject', description: 'first description'} as ProjectProposal;
            const response = await projectsController.create(user,request);
            expect(response).toBeNull();
        });
    });

    describe('getProjects', () => {
        it('returns array of projects', async () => {
            const response = await projectsController.getProjects(user);
            expect(response).toBeDefined();
            expect(response[0]).toHaveProperty("ROWID");
            expect(response[0]).toHaveProperty("description");
            expect(response[0]).toHaveProperty("guid");
            expect(response[0]).toHaveProperty("owner");
            expect(response[0]).toHaveProperty("title");
        }); 
    });

    describe('deleteProject', () => {
        it('project not owned/found error', async() => {
            const request = {title: 'nonexistantProject'} as ProjectTitleRequest;
            const response = await projectsController.delete(user, request);
            expect(response).toBeNull();
        });
    });
});