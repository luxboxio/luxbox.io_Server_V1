// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var lightelementSchema = new Schema({
    light_id: String,
    name: String,
    ip: String,
    areas: [{
        number: Number,
        name: String,
        color_type: String,
        color_mode: String,
        values: [{
            color: String,
            value: Number
        }]
    }],
    created_at: Date,
    updated_at: Date
}, { collection: 'lightelement' });

// on every save, add the date
lightelementSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var lightelement = mongoose.model('lightelement', lightelementSchema);

// make this available to our users in our Node applications
module.exports = lightelement;
