'use strict';
const { mongoose, Schema } = require('./../facy-imports');

const tokenSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 40
    },
    uuid: {
        type: String,
        required: true,
        trim: true,
        maxlength: 254
    },
},
    {
        timestamps: true
    })

/**
 * @typedef Token
 */
module.exports = mongoose.model('Token', tokenSchema);