const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
    conn.createChannel((err, ch) => {
      const queue = 'hello';
      ch.assertQueue(queue, {durable: false});       
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(queue, new Buffer('Hello World!'));
      console.log(" [x] Sent 'Hello World!'");
      setTimeout(() => { conn.close(); process.exit(0) }, 500);
    });
});