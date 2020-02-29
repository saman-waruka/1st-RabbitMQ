const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmq:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = 'rpc_queue';

    channel.assertQueue(queue, {
      durable: false
    });
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    channel.consume(queue, function reply(msg) {
      const n = parseInt(msg.content.toString());

      console.log(" [.] fib(%d)", n);

      const r = fibonacci(n);

      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(r.toString()), {
          correlationId: msg.properties.correlationId
        });

      channel.ack(msg);
    });
  });
});

function fibonacci(n) {
  // slow and use too much resource way
  // if (n == 0 || n == 1)
  //   return n;
  // else
  //   return fibonacci(n - 1) + fibonacci(n - 2);

  // faster way and use resource less than recursive way
  let current = 0;
  let after = 1;
  for ( let i = 0 ; i < n; i++) {
    const temp1 = after;
    const temp2 = current;
    current = temp1;
    after = temp1 + temp2;
  }
  return current;
}