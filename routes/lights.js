var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var lightelement = mongoose.model('lightelement');

// === /lights Main-Route ===

// === Get all entries ===
router.get('/', function(req, res, next) {

    lightelement.find({}, function(err, lightelements) {
        if (err) throw err;
        // object of all the lights
        res.json(lightelements);
    });

});


// === Get one entry ===
router.get('/:light_id', function(req, res, next) {
    // ToDo: implement function
});


// === Create a new entry ===
router.post('/', function(req, res, next) {

    console.log('### MCA ### \r\n' + req.body);

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
        res.json('update of \'' + req.params.light_id + '\' was a success!');
    });
});


// === Delte an entry ===
router.delete('/:light_id', function(req, res, next) {

});

module.exports = router;
