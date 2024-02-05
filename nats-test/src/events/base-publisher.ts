import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  private client: Stan;
  abstract subject: T["subject"];

  constructor(client: Stan) {
    this.client = client;
  }

  //publish an event to a channel and pass data
  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
