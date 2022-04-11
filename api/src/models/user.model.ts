import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { role } from "../interfaces/user";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
    nullable: false,
    type: "varchar",
    unique: true,
  })
  @Index()
  email: string;

  @Column({
    length: 30,
    nullable: false,
    type: "varchar",
    unique: true,
  })
  @Index()
  username: string;

  @Column({
    length: 100,
    nullable: false,
    type: "varchar",
  })
  password: string;

  @Column({
    enum: ["user", "admin"],
    nullable: false,
    type: "enum",
  })
  role: role;

  @Column({
    length: 100,
    nullable:true,
    type: "varchar"
  })
  token: string;

  @Column({
    nullable:true,
    type: "bool"
  })
  confirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default User;