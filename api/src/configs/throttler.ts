import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

export const throttlerProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

export default ThrottlerModule.forRoot({
  //ttl: 60,
  //limit: 20,
});