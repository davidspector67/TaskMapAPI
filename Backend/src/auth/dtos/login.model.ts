import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Login {

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