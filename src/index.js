var dgram = require('dgram');
var ip = require('ip');

var BROADCAST_ADDRESS = process.env.BROADCAST_ADDR || '192.168.1.255';
var BROADCAST_PORT =  process.env.BROADCAST_PORT || 3000;

var start = function start(protocolPort, cb) {
    var sock = dgram.createSocket('udp4');
    var ownIp = ip.address();

    sock.bind(BROADCAST_PORT, function(err) {
        if (err) {
            console.error(err);
        }

        sock.setBroadcast(true);
        var bacon = new Buffer('BACON');
        sock.send(bacon, 0, bacon.length, BROADCAST_PORT, BROADCAST_ADDRESS);
    });

    sock.on('error', function(err) {
        console.error(err);
        sock.close();
    });

    sock.on('message', function(msg, rinfo) {
        var regex = /^BACON_IS_HERE:(\d*)/;
        msg = msg && msg.toString();
        if (regex.test(msg)) {
            var port = msg.match(regex)[1];

            if(rinfo.address !== ownIp ||
              (rinfo.address === ownIp && port !== protocolPort))
            {
              cb(rinfo.address, port);
            }
        } else {
            var bacon = new Buffer('BACON_IS_HERE:' + protocolPort);
            sock.send(bacon, 0, bacon.length,
                BROADCAST_PORT, BROADCAST_ADDRESS);
        }
    });
};

module.exports = exports = {
  start: start
};
