import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;


  //getter, for the routes to have access to the nats client
  get client(){
    if(!this._client){
      throw new Error("can't connect NATS before connecting");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise<void>((resolve, reject) => {
      //this.client references mt getter that returns this._client therefore, this,client=this._client
      this.client.on("connect", () => {
        console.log("connected to NATS");
        resolve();
      });

      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
