'use strict';
const { dotenv, path } = require('./../../facy-imports');

/**
 * Import environment varibles
 */
dotenv.load({
    example: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    host: process.env.HOST,
    debug: JSON.parse(process.env.DEBUG || false),
    mongo: {
        uri: process.env.MONGO_URI
    },
    secret : process.env.SECRET
};