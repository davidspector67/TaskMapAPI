import { createParamDecorator, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/database/entities";

// Get user data from jwt
export const AuthUser = createParamDecorator(
	(_: unknown, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest();
		return request.user as User;
	},
);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}