import { createConnection } from "typeorm";
import User from "../features/users/models/user.model";

export default async function connect() {
  const connection = await createConnection({
    name:"test",
    type: "postgres",
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true
  });
  return connection
}