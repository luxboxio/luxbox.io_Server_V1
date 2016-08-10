var debug = require('debug')('lightswitch_space_ROUTE');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var lightelement = mongoose.model('lightelement');

// === /lights Main-Route ===

// === Get all entries ===
router.get('/', function(req, res, next) {
    debug('test!!!');
    lightelement.find({}, function(err, lightelements) {
        if (err) throw err;
        res.json(lightelements);
    });
});

// === Get one entry ===
router.get('/:light_id', function(req, res, next) {

    lightelement.findById(req.params.light_id, function(err, lightelement) {
        if (err) throw err;
        res.json(lightelement);
    });

});


// === Create a new entry ===
router.post('/', function(req, res, next) {

    // ToDo: implement Validating

    lightelement.create(req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

// === Update an entry ===
router.put('/:light_id', function(req, res, next) {
    var tmpLight = req.body;
    delete tmpLight._id;

    lightelement.findOne({ light_id: req.params.light_id }, function(err, foundLightelement) {
        if (err) throw err;

        if (!foundLightelement) {
            debug('No Item found to update...');
        } else {

            debug('Found one lightelement, updating Colorvalues');
            debug(foundLightelement.areas);

            for (var i = 0; i < foundLightelement.areas.length; i++) {
                debug(' in DB: ' + foundLightelement.areas[i]);

                for (var j = 0; j < foundLightelement.areas[i].values.length; j++) {
                    debug(' color: ' + foundLightelement.areas[i].values[j]);
                    debug('new ID:' + tmpLight.areas[i].values[j]._id);

                    var existingId = foundLightelement.areas[i].values[j]._id;
                    var idToCheck = tmpLight.areas[i].values[j]._id;

                    if (existingId == idToCheck) {
                        debug('matching _id :' + existingId);
                        debug(' old value: ' + foundLightelement.areas[i].values[j].value);
                        debug(' new value: ' + tmpLight.areas[i].values[j].value);

                        foundLightelement.areas[i].values[j].value = tmpLight.areas[i].values[j].value;
                    }

                }
            }

            foundLightelement.save(function(err) {
                if (err) throw err;

                debug('Colorvalues updated');
                res.json('update of \'' + req.params.light_id + '\' was a success!');
            });

            sendNewColorsToLightelement(foundLightelement);
            debug('Colorvalues sent to lightelement!');
        }
    });
});

function sendNewColorsToLightelement(light) {

    // Send new Colors to lightelement
    var PORT = 11111; // ToDo: Refactor config to separate file
    var HOST = light.ip;
    var dgram = require('dgram');
    var message = Buffer(JSON.stringify(light));

    var client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        debug('UDP message sent to ' + HOST + ':' + PORT);
        client.close();
    });
}


// === Delte an entry ===
router.delete('/:light_id', function(req, res, next) {

    lightelement.findOneAndRemove({ light_id: req.params.light_id }, function(err) {
        if (err) throw err;

        // we have deleted the user
        debug('Lightelement "' + req.params.light_id + '"deleted!');
    });
});

module.exports = router;
