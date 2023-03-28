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

}