var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    local: {
        id: String,
        pidm: String,
        username: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    admin: Boolean,
    flag: Number
});

mongoose.model('user', userSchema);

var appSchema = new mongoose.Schema({
    developer: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: String,
    description: String,
    cli_id: String,
    cli_secret: String,
    date_in: Date,
    date_out: Date,
    forever: Boolean,
    flag: Number
});

mongoose.model('app', appSchema);

var tokenSchema = new mongoose.Schema({
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'app' },
    hash: String,
    flag: Number
});

mongoose.model('token', tokenSchema);