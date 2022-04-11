import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

export const throttlerProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

export default ThrottlerModule.forRoot({
  ttl: 60,
  limit: 20,
});
