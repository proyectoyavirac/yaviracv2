var mongoose = require('mongoose');

var schema = mongoose.Schema;

var personaSchema = schema({
    inputName: String,
    inputPassword: String,
    inputEmail: String
});

module.exports = mongoose.model('Persona', personaSchema);