'use strict';
var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        maxlength: 254,
        default: null
    },
    last_name: {
        type: String,
        trim: true,
        maxlength: 254,
        default: null
    },
    username: {
        type: String,
        trim: true,
        maxlength: 254,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 254
    },
    password: {
        type: String,
        trim: true,
        maxlength: 254,
        default: null
    },
    is_super_admin: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', user_schema);
