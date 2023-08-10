import { ConfigurableModuleBuilder } from "@nestjs/common";
import type { BeeQueueModuleOptions } from "./interfaces";
import { createBeeQueueServiceProvider } from "./bee-queue.providers";
import { BeeQueueService } from "./bee-queue.service";

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<BeeQueueModuleOptions>({
  moduleName: "BeeQueue",
})
  .setClassMethodName("forRoot")
  .setFactoryMethodName("createBeeQueueOptions")
  .setExtras({}, (definition) => {
    const beeQueueServiceProvider = createBeeQueueServiceProvider();
    definition.exports = [BeeQueueService];
    definition.providers = [
      ...definition.providers,
      beeQueueServiceProvider,
    ];
    return definition;
  })
  .build();
