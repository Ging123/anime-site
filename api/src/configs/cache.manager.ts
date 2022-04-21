import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { CacheModule } from "@nestjs/common";

export default CacheModule.register<RedisClientOptions>({
  store:redisStore,
  isGlobal:true
})