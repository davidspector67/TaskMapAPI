import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project, User } from "../database/entities";
import { AuthController } from "../auth/auth.controller";
import { AuthService, expireSec } from "../auth/auth.service";
import { LoginRequest } from "../auth/dtos/request.entities";
import { JwtStrategy } from "../auth/jwt.strategy";
import { TypeOrmTestingModule } from "./TypeOrmTestingModule";

// Current test database contains one user with:
// - username: firstUser
// - password: password

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    // let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmTestingModule([User, Project]), 
                TypeOrmModule.forFeature([User, Project]),
                JwtModule.register({
                    secret: 'proflow_jwt_key',
                    signOptions: { expiresIn: expireSec },
                  })
            ],
            controllers: [AuthController],
            providers: [AuthService, JwtStrategy],
        }).compile();

        // jwtService = new JwtService();
        authService = module.get<AuthService>(AuthService);
        authController = new AuthController(authService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('login', () => {
        it('should return a JSON object containing a jwt, guid, and expireSec', async () => {
            const request = {username: 'firstUser', password: 'hiThere'} as LoginRequest;
            const response = await authController.login(request);
            expect(response).toBeDefined();
            expect(response).toHaveProperty('jwt');
            expect(response).toHaveProperty('guid');
            expect(response).toHaveProperty('expireSec');
        });

        it('user error', async () => {
            const request = {username: 'firstUse', password: 'hiThere'} as LoginRequest;
            const response = await authController.login(request);
            expect(response).toBeNull();
            // expect(response).toEqual("User does not exist")
        });

        it('password error', async () => {
            const request = {username: 'firstUser', password: 'hi'} as LoginRequest;
            const response = await authController.login(request);
            expect(response).toBeNull();
            // expect(response).toEqual("Incorrect password");
        });
    });

    describe('signUp', () => {
        it('user already exists error', async () => {
            const request = { username: 'firstUser', password: 'password'} as LoginRequest;
            const response = await authController.signUp(request);
            expect(response).toBeNull();
            // expect(response).toEqual("Account with this username already exists! Try a different username.");
        }) ;
    });
});