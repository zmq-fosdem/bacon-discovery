var bacon = require('./../src/');

bacon.start(process.env.PORT || '4012', function gotBacon(address, port) {
    console.log('bacon address', address);
    console.log('bacon port', port);
});
