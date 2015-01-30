var bacon = require('./../src/');

bacon.start('4040', function gotBacon(address, port) {
    console.log('bacon address', address);
    console.log('bacon port', port);
});
