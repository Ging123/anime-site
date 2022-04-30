import { 
  Column,
  CreateDateColumn,
  Entity, 
  Index, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from "typeorm";

@Entity()
class Tag {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length:30,
    type:"varchar",
    unique:true
  })
  @Index()
  name:string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Tag;