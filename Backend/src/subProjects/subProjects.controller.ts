import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SubProject, User } from '../database/entities';
import { AuthUser, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubProjectsService } from './subProjects.service';
import { DeleteSubProjectProposal, SubProjectProposal } from './dtos/subproject.model';

@ApiTags('subProject')
@Controller('')
export class SubProjectsController {
    constructor( private readonly subProjectService: SubProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: "projGuid", required: true, description: "Project guid"})
    @ApiParam({name: "subProjGuid", required: false, description: "Sub-Project guid"})
    @Post(':projGuid/:subProjGuid/addSubproject')
    async addSubproject(@AuthUser() user: User, @Param() param: { projGuid: string, subProjGuid: string }, @Body() subProjectProposal: SubProjectProposal): Promise<SubProject> {
        return await this.subProjectService.addSubproject(user, param.projGuid, param.subProjGuid, subProjectProposal.title);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: "projGuid", required: true, description: "Project guid"})
    @Post(':projGuid/delete')
    async deleteSubproject(@AuthUser() user: User, @Param() param: {projGuid: string}, @Body() subProjectGuid: DeleteSubProjectProposal): Promise<boolean> {
        return await this.subProjectService.deleteSubproject(user, param.projGuid, subProjectGuid);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam(({name: "projGuid", required: true, description: "Project guid"}))
    @ApiParam(({name: "subProjGuid", required: false, description: "Sub-Project guid"}))
    @Get(':projGuid/:subProjGuid/getAllSubprojects')
    async getAllSubprojects(@AuthUser() user: User, @Param() param: {projGuid: string, subProjGuid: string}): Promise<SubProject[]> {
        return await this.subProjectService.getAllSubprojects(user, param.projGuid, param.subProjGuid);
    }
}
