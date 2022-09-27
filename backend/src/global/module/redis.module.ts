// import { DynamicModule } from "@nestjs/common";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { RedisModule, RedisModuleOptions } from "nestjs-redis";

// export const Redis: DynamicModule = RedisModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (config: ConfigService): RedisModuleOptions => {
//     return {
//       host: process.env.REDIS_HOST ?? config.get<string>("REDIS_HOST"),
//       port: Number(process.env.REDIS_PORT ?? config.get<number>("REDIS_PORT")),

//       // db: process.env.REDIS_DB ?? config.get<string>("REDIS_DB"),
//       password: process.env.REDIS_PWD ?? config.get<string>("REDIS_PWD"),
//     };
//   },
// });
