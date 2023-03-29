import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, Project, SubProject, Card, ProjectColumn } from "../database/entities";
import { SubProjectsController } from "../subProjects/subProjects.controller";
import { AuthService } from "../auth/auth.service";
import { TypeOrmTestingModule } from "./TypeOrmTestingModule";
import { AuthController } from "../auth/auth.controller";
import { SubProjectsService } from "../subProjects/subProjects.service";

// Current test database contains one user with:
// - username: firstUser
// - password: hiThere
// - project with guid: 3b3339df-b389-476e-8d50-8639a4afb92d
//    - and subproject with guid: 7a62eb51-ee88-4bbb-a5c8-54c3291be8ce
//      - and another subproject as a child of the above subproject

const projGuid = '3b3339df-b389-476e-8d50-8639a4afb92d';
const subProjGuid = '7a62eb51-ee88-4bbb-a5c8-54c3291be8ce';

describe('SubProjectsController', () => {
    let subProjectsController: SubProjectsController;
    let subProjectsService: SubProjectsService;
    let authService: AuthService;
    let user: User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmTestingModule([User, Project, SubProject, Card, ProjectColumn]), 
                TypeOrmModule.forFeature([User, Project, SubProject, Card, ProjectColumn]),
            ],
            controllers: [SubProjectsController, AuthController],
            providers: [SubProjectsService, AuthService, JwtService],
        }).compile();

        // jwtService = new JwtService();
        subProjectsService = module.get<SubProjectsService>(SubProjectsService);
        subProjectsController = new SubProjectsController(subProjectsService);
        authService = module.get<AuthService>(AuthService);
        user = await authService.validateUser({username: 'firstUser', password: 'hiThere'});
    });

    it('should be defined', () => {
        expect(subProjectsController).toBeDefined();
    });

    describe('addSubproject', () => {
        it('subProject already exists in depth=1', async () => {
          const response = await subProjectsController.addSubproject(user, 
            { projGuid, subProjGuid: ','}, 
            {title: "first branch"}); 
          expect(response).toBeNull();
        });

        it('subProject already exists in depth>1', async () => {
          const response = await subProjectsController.addSubproject(user,
            { projGuid, subProjGuid },
            {title: "second branch"});
          expect(response).toBeNull();
        })
    });

    describe('deleteSubproject', () => {
        it('subproject not found', async () => {
            const response = await subProjectsController.deleteSubproject(
              user, {projGuid}, {guid: 'adfad'}
            );
            expect(response).toBeNull();
        }); 
    });

    describe('getAllSubprojects', () => {
        it('list all subprojects from root', async () => {
            const response = await subProjectsController.getAllSubprojects(user, 
              {projGuid, subProjGuid: ','}
              );
            expect(response).toBeDefined();
            expect(response.length).toBe(2);
            expect(response[0]).toHaveProperty("ROWID");
            expect(response[0]).toHaveProperty("guid");
            expect(response[0]).toHaveProperty("title");
        });

        it('list all subprojects from "first branch"', async () => {
          const response = await subProjectsController.getAllSubprojects(user, 
            {projGuid, subProjGuid}
            );
          expect(response).toBeDefined();
          expect(response.length).toBe(1);
          expect(response[0]).toHaveProperty("ROWID");
          expect(response[0]).toHaveProperty("guid");
          expect(response[0]).toHaveProperty("title");
        });

        it('invalid project', async () => {
          const response = await subProjectsController.getAllSubprojects(user, 
            {projGuid: 'asdfa', subProjGuid}
            );
          expect(response).toBeNull();
        });

        it('list all subprojects of subproject with no children', async () => {
          const response = await subProjectsController.getAllSubprojects(user, 
            {projGuid, subProjGuid: '645b364b-91b6-4aa2-b708-d7b0830ea26d'}
            );
          expect(response).toBeNull();
        });

        it('invalid subproject', async () => {
          const response = await subProjectsController.getAllSubprojects(user, 
            {projGuid, subProjGuid: 'asfasd'}
            );
          expect(response).toBeNull();
        });
    });
});