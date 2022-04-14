import { DeleteResult, InsertResult } from "typeorm";
import User from "../models/user.model";

export interface UserRepository {
  findByEmail:(email:string) => Promise<User>;
  findByUsername:(username:string) => Promise<User>;
  findByEmailOrUsername:(emailOrUsername:string) => Promise<User>;
  deleteByEmail:(email:string) => Promise<DeleteResult>;
  createUser:(email:string, name:string, password:string) => Promise<InsertResult>;
}