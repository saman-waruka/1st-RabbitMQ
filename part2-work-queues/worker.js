const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
  if (err) {
    throw err;
  }
    conn.createChannel((err, channel) => {
      console.log(" Waiting For message ");
      const queue = 'task_queue';
      
      // This makes sure the queue is declared before attempting to consume from it
      channel.assertQueue(queue, {durable: true});    

      // set max message will recieve
      // channel.prefetch(2);   

      channel.consume(queue, function(msg) {
        const secs = msg.content.toString().split('.').length - 1;
      
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
          console.log(" [x] Done");
        }, secs * 1000);
      }, {
        // automatic acknowledgment mode,
        // see https://www.rabbitmq.com/confirms.html for details
        noAck: false
      });
    });
});