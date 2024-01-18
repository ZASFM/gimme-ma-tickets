import nats from 'node-nats-streaming';

//connecting nats to :4222
const stan = nats.connect("ticketing","abc",{
   url:"http://localhost:4222"
});

//on successful connection log the message
stan.on("connect",()=>{
   console.log("Publisher connected to nats");
})