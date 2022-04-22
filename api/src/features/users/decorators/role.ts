import { SetMetadata } from "@nestjs/common";
import { role } from "../interfaces/user";

export const AllowedRole = (role:role[]) => SetMetadata("role", role);