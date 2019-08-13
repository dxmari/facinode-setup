'use strict';
const { mongoose, Schema } = require('../../../facy-imports');

var user_schema = Schema({
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
    email: {
        type: String,
        trim: true,
        maxlength: 254,
        unique: true,
        required: true
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
