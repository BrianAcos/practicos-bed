const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', function (err) {
    console.log('Error' + err);
});

client.set('color', 'red');

client.get('color', function (err, value) {
    if (err) throw err;
    console.log('Got: ' + value);

    client.quit();
});