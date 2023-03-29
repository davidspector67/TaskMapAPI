import { Entity, Column, Generated, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

// entities correspond to tables

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "ROWID" })
  readonly ROWID: number;

  @Column({ type: "text" })
	@Generated("uuid")
	readonly guid: string;

  @Column({ type: "longtext" })
  readonly username: string;

  @Column({ type: "longtext" })
  readonly password: string;

  @OneToMany(() => Project, (project) => project.owner, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  readonly ownedProjects: Project[];
}

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn({ name: "ROWID" })
  readonly ROWID: number;

  @Generated("uuid")
  @Column({ type: "text" })
  readonly guid: string;

  @Column({ type: "longtext" })
  readonly title: string;

  @Column({ type: "longtext"})
  readonly description: string;

  @ManyToOne(() => User, (user) => user.ownedProjects, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({name: "owner_id"})
  readonly owner: User;

  // only includes top-level subprojects. The rest are children of these top-level subprojects
  @OneToMany(() => SubProject, (subproject) => subproject.project, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  readonly subprojects: SubProject[];

}

@Entity("subprojects")
export class SubProject {
  @PrimaryGeneratedColumn({ name: "ROWID" })
  readonly ROWID: number;

  @Generated("uuid")
  @Column({ type: "text" })
  readonly guid: string;

  @Column({ type: "longtext" })
  readonly title: string;

  @ManyToOne(() => Project, (project) => project.subprojects, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({name: "project_id"})
  readonly project: Project;

  @OneToMany(() => SubProject, (subproject) => subproject.parent, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  readonly children: SubProject[];

  @ManyToOne(() => SubProject, (subproject) => subproject.children, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({name: "parent_id"})
  readonly parent?: SubProject;

  @OneToMany(() => Card, (card) => card.subproject, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  readonly cards: Card[];
}

@Entity("projectColumns")
export class ProjectColumn {
  @PrimaryGeneratedColumn({ name: "ROWID" })
  readonly ROWID: number;

  @Generated("uuid")
  @Column({ type: "text" })
  readonly guid: string;

  @Column({ type: "longtext" })
  readonly title: string;

  @OneToMany(() => Card, (card) => card.column, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  readonly cards: Card[];
}

@Entity("cards")
export class Card {
  @PrimaryGeneratedColumn({ name: "ROWID" })
  readonly ROWID: number;

  @Column({ type: "longtext" })
  readonly title: string;

  @Column({ type: "longtext" })
  readonly description: string;

  @ManyToOne(() => ProjectColumn, (column) => column.cards, {onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "projectColumn_id"})
  readonly column: ProjectColumn;

  @ManyToOne(() => SubProject, (subProject) => subProject.cards, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  @JoinColumn({ name: "subProject_id"})
  readonly subproject: SubProject;
}