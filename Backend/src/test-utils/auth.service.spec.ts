import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, User } from '../database/entities';
import { AuthController } from '../auth/auth.controller';
import { AuthService, expireSec } from '../auth/auth.service';
import { LoginRequest } from '../auth/dtos/request.entities';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmTestingModule } from './TypeOrmTestingModule';

// Current test database contains one user with:
// - username: firstUser
// - password: password

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('user doesn\'t exist error', async () => {
        const request = {username: 'firstUse', password: 'hiThere'} as LoginRequest;
        const response = await service.validateUser(request);
        expect(response).toBeNull();
    });

    it('incorrect password error', async () => {
        const request = {username: 'firstUser', password: 'test'} as LoginRequest;
        const response = await service.validateUser(request);
        expect(response).toBeNull();
    });

    it('user found', async () => {
        const request = {username: 'firstUser', password: 'hiThere'} as LoginRequest;
        const response = await service.validateUser(request);
        expect(response).toBeDefined();
        expect(response).toHaveProperty("guid");
        expect(response).toHaveProperty("username");
        expect(response).toHaveProperty("password");
        expect(response).toHaveProperty("ROWID");
    });
  });
  
});
