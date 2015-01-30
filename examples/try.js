var bacon = require('./../src/');

bacon.start('4040', function gotBacon(port) {
    console.log('bacon', port);

});
