import { Injectable } from '@nestjs/common';
import Queue from 'bee-queue';
import { RedisClient } from 'redis';

@Injectable()
export class BeeQueueService {
  private queueMap: Map<string, Queue>;

  constructor(private readonly client: RedisClient) {
    this.queueMap = new Map<string, Queue>();
  }

  public getQueue<T>(queueName: string) {
    const queue = this.queueMap.get(queueName);
    if (queue) {
      return queue as Queue<T>;
    }
    const newQueue = new Queue<T>(queueName, {
      redis: this.client,
      isWorker: false,
    });
    this.queueMap.set(queueName, newQueue);
    return newQueue;
  }

  public closeConnection() {
    return Array.from(this.queueMap).map(([_, q]) => {
      return q.close();
    });
  }
}
