import { DeleteResult, InsertResult } from "typeorm";
import { role } from "../interfaces/user";
import User from "../models/user.model";

export interface UserRepository {
  findByEmail:(email:string) => Promise<User>;
  findByUsername:(username:string) => Promise<User>;
  findByEmailOrUsername:(emailOrUsername:string) => Promise<User>;
  deleteByEmail:(email:string) => Promise<any>;
  createUser:(email:string, name:string, password:string, role:role) => Promise<any>;
}