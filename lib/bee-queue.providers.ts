import { Logger, type FactoryProvider } from "@nestjs/common";
import { BeeQueueService } from "./bee-queue.service";
import { MODULE_OPTIONS_TOKEN } from "./bee-queue.module-definition";
import { ClientOpts, RedisClient, createClient } from "redis";

export const createBeeQueueServiceProvider = (): FactoryProvider => {
  return {
    provide: BeeQueueService,
    useFactory: async (redis: RedisClient | ClientOpts) => {
      if(!(redis instanceof RedisClient)) {
        redis = createClient(redis);
      }
      const beeQueueService = new BeeQueueService(redis);
      return beeQueueService;
    },
    inject: [MODULE_OPTIONS_TOKEN],
  };
};
