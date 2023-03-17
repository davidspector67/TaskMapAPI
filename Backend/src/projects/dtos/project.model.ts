import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Project {

    @ApiProperty(({
        description: "Project title. No restrictions for now, but will return 400 if empty."
    }))
    @IsNotEmpty()
    title: string;

    @ApiProperty(({
        description: "Project description. No restrictions for now, but will return 400 if empty."
    }))
    @IsNotEmpty()
    description: string;

}