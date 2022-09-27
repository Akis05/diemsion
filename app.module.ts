import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

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

    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => {
        const uri =
          process.env.DATABASE_URL ?? configService.get<string>('DATABASE_URL');
        new Logger('MongooseModule').log('Connecting to mongoDB... ' + uri);
        return {
          uri: uri,
        };
      },
      inject: [ConfigService],
    }),
    PassportModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
