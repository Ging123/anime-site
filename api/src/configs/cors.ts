import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
  isGlobal: true,
});

const cors: CorsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL!,
};

export default cors;
