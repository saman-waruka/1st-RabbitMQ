#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
  if (err) {
    throw err;
  }
    conn.createChannel((err2, channel) => {
      if (err2) {
        throw err2;
      }
      const exchange = 'direct_logs';
      const args = process.argv.slice(2);
      const msg = args.slice(1).join(' ') || 'Hello World!';
      const severity = (args.length > 0) ? args[0] : 'info';
  
      channel.assertExchange(exchange, 'direct', {
        durable: false
      });
      channel.publish(exchange, severity, Buffer.from(msg));
      console.log(" [x] Sent %s: '%s'", severity, msg);
  

      setTimeout(() => { conn.close(); process.exit(0) }, 500);
    });
});