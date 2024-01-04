const mongoose = require('mongoose');
const logger = require('./logger');

function connectToDatabase(uri) {
    return mongoose.connect(uri, {})
        .then(() => {
            logger.info('Connected to the database');
        })
        .catch((err) => {
            logger.error(`Error connecting to the database. \n${err}`);
        });
}

module.exports = connectToDatabase;
