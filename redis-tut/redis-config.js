const redis = require('redis');

const client = redis.createClient();

client.connect();
client.on('connect', () => {
    console.log('redis connected');
});

client.on('error', (err) => {
    console.log('redis error while connecting', err)
});

module.exports = client;