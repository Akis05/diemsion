import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisModule, RedisService } from 'nestjs-redis';
import { SessionModule, NestSessionOptions } from 'nestjs-session';

import ConnectRedis from 'connect-redis';
import session from 'express-session';

const RedisStore = ConnectRedis(session);

export const Session = SessionModule.forRootAsync({
  imports: [RedisModule, ConfigModule],
  inject: [RedisService, ConfigService],
  useFactory: (
    redisService: RedisService,
    config: ConfigService,
  ): NestSessionOptions => {
    const redisClient = redisService.getClient();

    const store = new RedisStore({ client: redisClient as any });
    return {
      session: {
        store,
        secret: config.get<string>('SESSION_SECRET'),
      },
    };
  },
});
