import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

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
}

@Entity("projects")
export class Project {
    @PrimaryGeneratedColumn({ name: "ROWID" })
    readonly ROWID: number;

    @Column({ type: "text" })
    @Generated("uuid")
    readonly guid: string;

    @Column({ type: "longtext" })
    readonly title: string;

    @Column({ type: "longtext"})
    readonly description: string;
}