var mongoose = require('mongoose');

module.exports = mongoose.model('Persona', {
   
    inputName: String,
    inputPassword: String,
    inputEmail: String

});