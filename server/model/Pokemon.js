const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({
    pokemonIMG_front: String,
    pokemonIMG_back: String,
    name: String,
    hp_stat: Number,
    attack_stat: Number,
    deffense_stat: Number
})

const PokemonModel = mongoose.model('Pokemon', PokemonSchema);

module.exports = PokemonModel;