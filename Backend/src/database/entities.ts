import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// entities correspond to tables
@Entity("users")
export class UserData {
  @PrimaryGeneratedColumn({ name: "ROWID" })
  readonly ROWID: number;

  @Column({ type: "longtext" })
  readonly username: string;

  @Column({ type: "longtext" })
  readonly password: string;
}

@Entity("projects")
export class ProjectData {
    @PrimaryGeneratedColumn({ name: "ROWID" })
    readonly ROWID: number;

    @Column({ type: "longtext" })
    readonly title: string;

    @Column({ type: "longtext"})
    readonly description: string;
}