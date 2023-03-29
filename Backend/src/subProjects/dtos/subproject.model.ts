import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class SubProjectProposal {
    @ApiProperty(({
        description: "Subproject title. No restrictions for now, but will return 400 if empty."
    }))
    @IsNotEmpty()
    title: string;
}

export class DeleteSubProjectProposal {
    @ApiProperty(({
        description: "GUID of subproject to delete"
    }))
    @IsNotEmpty()
    guid: string;

}