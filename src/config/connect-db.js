'use strict';

const { ENV_CONSTANTS, mongoose } = require('../../facy-imports');

const {
    debug, env, mongo
} = ENV_CONSTANTS

var options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

/**
 * Exit application on error
 */
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

/**
 * print mongoose logs in dev env
 */
if (env === 'development') {
    mongoose.set('debug', debug);
}

/**
 * Connect to mongo db
 */
exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongo.uri, options, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("db connected");
                resolve(mongoose.connection);
            }
        });
    })
};
