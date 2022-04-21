import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Anime {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
    nullable: false,
    type: "varchar",
    unique: true,
  })
  @Index()
  name: string;

  @Column({
    length: 300,
    nullable: true,
    type: "varchar"
  })
  description: string;

  @Column({
    length: 300,
    nullable: false,
    type: "varchar",
  })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Anime;