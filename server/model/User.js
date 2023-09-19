const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    pokemons: [String]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel; 