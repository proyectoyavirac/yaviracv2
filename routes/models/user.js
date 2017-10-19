var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = Schema({

    username: { type: String, requiride:true,  unique: true },
    password: { type: String , requiride:true},
    email: { type: String, unique: true,requiride:true, lowercase: true },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);