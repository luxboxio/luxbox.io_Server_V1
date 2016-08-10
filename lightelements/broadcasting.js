var debug = require('debug')('lightswitch_space_UDP');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var mongoose = require('mongoose');
var lightelement = mongoose.model('lightelement');

// === UDP TEST ===

server.on('error', (err) => {
    debug(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    debug('msg: ' + msg);

    var light = JSON.parse(msg);
    light.ip = rinfo.address;

    // ToDo:
    // Element already in Database?
    // If not, create with colors set to '0'
    // If yes, Update everything except colors (?!?)
    lightelement.findOne({ light_id: light.light_id }, function(err, foundLightelement) {
        if (err) throw err;

        if (!foundLightelement) {
            debug('No Item found, creating element');

            var newLight = lightelement(light);
            newLight.save(function(err) {
                if (err) throw err;

                debug('light created');
            });

        } else {
            debug('Found one lightelement, updating IP');

            // Update IP
            foundLightelement.ip = light.ip;

            // If Area count or color mode is different
            // -> Update these too

            // ToDo: implement

            foundLightelement.save(function(err) {
                if (err) throw err;

                debug('light IP updated');
            });
        }

    });

    // Save to database 
    /*lightelement.update({ light_id: light.light_id }, light, { upsert: true, setDefaultsOnInsert: true, runValidators: true }, function(err, result) {
        if (err) throw err;

        debug('upsert of \'' + light.light_id + '\' was a success!');
    });

    lightelement.findOneAndUpdate();*/

});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(11110);
// server listening 0.0.0.0:11110
