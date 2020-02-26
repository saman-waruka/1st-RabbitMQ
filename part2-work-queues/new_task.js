const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
    if (err) {
        throw err;
    }
    conn.createChannel((err, channel) => {
        const queue = 'task_queue';
        const msg = process.argv.slice(2).join(' ') || "Hello World!";
        channel.assertQueue(queue, {durable: true});

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
        
        console.log(" [x] Sent '%s'", msg);
        setTimeout(() => { conn.close(); process.exit(0) }, 500);
    });
});