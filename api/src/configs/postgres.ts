import Anime from "../features/animes/models/anime.model";
import User from "../features/users/models/user.model";
import Tag from "../features/tags/models/tag.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

const production = process.env.STATUS === "PRO";

ConfigModule.forRoot({
  isGlobal: true,
});

export default TypeOrmModule.forRoot({
  type: "postgres",
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ User, Anime, Tag ],
  synchronize: production ? false : true,
  logging: false,
});
