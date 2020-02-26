const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
    if (err) {
        throw err;
    }
    conn.createChannel((err, ch) => {
        const queue = 'hello';
        const q = ch.assertQueue(queue, {durable: false});
        console.log(" [*] Waiting for messages in %s.", q);
        ch.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: false});
    });
});