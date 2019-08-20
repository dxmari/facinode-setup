'use strict';
var mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 40
    }
},
    {
        timestamps: true
    })

/**
 * @typedef Token
 */
module.exports = mongoose.model('Cities', schema);