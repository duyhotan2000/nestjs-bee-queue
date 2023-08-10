import { Module, OnApplicationShutdown } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ConfigurableModuleClass } from "./bee-queue.module-definition";
import { BeeQueueService } from "./bee-queue.service";

@Module({})
export class BeeQueueModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  async onApplicationShutdown() {
    const beeQueueService = this.moduleRef.get(BeeQueueService);
    await beeQueueService.closeConnection();
  }
}
