var debug = require('debug')('lightswitch_space_MONGOOSE');

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var lightelementSchema = new Schema({
    light_id: String,
    name: String,
    ip: String,
    fw_version: String,
    areas: [{
        number: Number,
        name: String,
        color_type: String,
        color_mode: { type: Number, default: 0 },
        supported_modes: String,
        values: [{
            color: String,
            value: { type: Number, default: 0 }
        }]
    }],
    created_at: Date,
    updated_at: Date
}, {
    collection: 'lightelement'
});

// on every save, add the date // ToDo: Cleanup
lightelementSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// on every update, add the date
lightelementSchema.pre('update', function(next) {
    debug('pre Update...');
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this._update.$set.updated_at = currentDate;


    debug(this._update.$set);

    next();
});

// the schema is useless so far
// we need to create a model using it
var lightelement = mongoose.model('lightelement', lightelementSchema);

// make this available to our users in our Node applications
module.exports = lightelement;
