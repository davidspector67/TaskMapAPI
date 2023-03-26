import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {

    @ApiProperty({
        description: "Username of the user. No restrictions for now, but will return 400 if empty."
    })
    @IsNotEmpty()
    username: string;

    
    @ApiProperty({
        description: "Password of the user. No restrictions for now, but will return 400 if empty."
    })
    @IsNotEmpty()
    password: string;
}

export class LoginResponse {
	/*
	 * The user's GUID.
	 */
	guid: string;

	/*
	 * The JSON Web Token (jwt) that is required to perform any authorized actions.
	 */
	jwt: string;

	/*
	 * The expire time of the jwt in seconds.
	 */
	expireSec: number;
}
