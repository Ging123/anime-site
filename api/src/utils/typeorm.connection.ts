import Anime from "../features/animes/models/anime.model";
import User from "../features/users/models/user.model";
import Tag from "../features/tags/models/tag.model";
import { createConnection } from "typeorm";

export default async function connect() {
  const connection = await createConnection({
    name:"test",
    type: "postgres",
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Anime, Tag],
    synchronize: true
  });
  return connection
}