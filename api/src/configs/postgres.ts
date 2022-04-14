import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import User from "../features/users/models/user.model";

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
  entities: [User],
  synchronize: production ? false : true,
  logging: false,
});
