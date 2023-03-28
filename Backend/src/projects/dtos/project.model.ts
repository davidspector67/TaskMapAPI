import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class ProjectTitleRequest {
    @ApiProperty(({
        description: "Project title. No restrictions for now, but will return 400 if empty."
    }))
    @IsNotEmpty()
    title: string;
}

export class ProjectProposal extends ProjectTitleRequest {

    @ApiProperty(({
        description: "Project description. No restrictions for now, but will return 400 if empty."
    }))
    @IsNotEmpty()
    description: string;

}