import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'nestjs-redis';
import { RedisModuleOptions } from 'nestjs-redis/dist';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Session } from './global/module/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): RedisModuleOptions => {
        return {
          host: process.env.REDIS_HOST ?? config.get<string>('REDIS_HOST'),
          port: Number(
            process.env.REDIS_PORT ?? config.get<number>('REDIS_PORT'),
          ),

          // db: process.env.REDIS_DB ?? config.get<string>("REDIS_DB"),
          password: process.env.REDIS_PWD ?? config.get<string>('REDIS_PWD'),
        };
      },
    }),
    Session,
    PassportModule.register({ defaultStrategy: 'firebase' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

