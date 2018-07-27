'use strict';

// --------external modules----------
const mongoose = require('mongoose');

// -------internal modules----------
const db = require('../config/constants.js').db;

mongoose.Promise = global.Promise;

// Connect to mongo DB
mongoose.connect(db.uri, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to MongoDB');
    }
});