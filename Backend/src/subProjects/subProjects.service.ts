import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, SubProject, User } from '../database/entities';
import { DeleteSubProjectProposal, SubProjectProposal } from './dtos/subproject.model';

@Injectable()
export class SubProjectsService {
    constructor(
        @InjectRepository(Project) private projects: Repository<Project>,
        @InjectRepository(SubProject) private subProjects: Repository<SubProject>,
        ) {}

    async subProjectDFS(curProject: SubProject): Promise<SubProject[]> {
        const subProjects = await this.subProjects.find({where: {parent: curProject}});
        if (subProjects.length === 0)
            return null;

        let curSubProjects: SubProject[] = [];
        subProjects.map(async (subproject) => {
            curSubProjects.push(subproject);
            curSubProjects.concat(await this.subProjectDFS(subproject));
        });
        return curSubProjects;
    }

    async validateProject(user: User, guid: string): Promise<Project> {
        const project = await this.projects.findOne({where: {guid, owner: user}, relations: {owner: true}});
        if (!project) {
          console.log("Project validation failed");
          return null;
        }
    
        return project;
    }
    
    async validateSubProject(guid: string, project?: Project): Promise<SubProject> {
    const subProject = await this.subProjects.findOne({where: {guid}, relations: {project: true}});
    if (!subProject) {
        console.log("Subproject not found");
        return null;
    }
    if (project) {
        if (subProject.project.guid === project.guid)
        return subProject;
        else {
        console.log("Subproject not in inputted project");
        return null;
        }
    }
    return subProject;
    }

    async addSubproject(user: User, projGuid: string, subProjGuid: string, title: string): Promise<SubProject> {
        const children = await this.getAllSubprojects(user, projGuid, subProjGuid);
        if (children){
            const childExists = children.filter( child => child.title === title);
            if (childExists.length > 0) {
                console.log("Child already exists with same name");
                return null;
            }
        }

        const project = await this.projects.findOne({where: { guid: projGuid }});

        if (subProjGuid !== ',') {
            const subProject = await this.subProjects.findOne({where: {guid: subProjGuid, project}});            
            return await this.subProjects.save({ title, project, parent: subProject });
        }
        return await this.subProjects.save({ title, project });
    }

    async deleteSubproject(user: User, projGuid, subProjectGuid: DeleteSubProjectProposal): Promise<boolean> {
        const project = await this.validateProject(user, projGuid);
        if (!project) 
            return null;
        
        const subProject = await this.validateSubProject(subProjectGuid.guid, project);
        if (!subProject) 
            return null;

        await this.subProjects.delete({guid: subProjectGuid.guid});
        return true;    
    }
    

    async getAllSubprojects(user: User, projGuid: string, subProjGuid: string): Promise<SubProject[]> {
        const project = await this.validateProject(user, projGuid);
            if (!project) 
            return null
        
        if (subProjGuid !== ',') {
            const subProject = await this.validateSubProject(subProjGuid, project);
            if (!subProject)
                return null;
            return await this.subProjectDFS(subProject);
        }
        else {
            const firstSubProjects = await this.subProjects.find({where: {project, parent: null}})
            let subProjects: SubProject[] = [];
            firstSubProjects.map(async (subproject) => {
                subProjects.push(subproject);
                subProjects.concat(await this.subProjectDFS(subproject));
            })
            return subProjects;
        }
    }
}
