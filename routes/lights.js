var debug = require('debug')('lightswitch_space');
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

    lightelement.findByIdAndUpdate(req.params.light_id, tmpLight, function(err, result) {
        if (err) throw err;

        var PORT = 11111;
        var HOST = '192.168.0.39';
        var dgram = require('dgram');
        var message = Buffer(JSON.stringify(tmpLight));

        var client = dgram.createSocket('udp4');
        client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST + ':' + PORT);
            client.close();
        });


        res.json('update of \'' + req.params.light_id + '\' was a success!');
    });
});


// === Delte an entry ===
router.delete('/:light_id', function(req, res, next) {

});

module.exports = router;
