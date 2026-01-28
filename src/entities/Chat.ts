
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userAId!: string;

  @Column()
  userBId!: string;
}
