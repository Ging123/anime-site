import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";

ConfigModule.forRoot({
  isGlobal: true,
});

export default BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});
