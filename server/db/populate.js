const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const PokemonModel = require('../model/Pokemon');

const { MONGO_URL } = process.env;

let pokemons = [];

async function populatePokemons () {
    try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0');
    const data = await res.json();
    for (let item of data.results) {
        const res = await fetch(item.url);
        const data = await res.json();
        pokemons.push({
            'pokemonIMG_front': data.sprites.front_default,
            'pokemonIMG_back': data.sprites.back_default,
            'name': data.name,
            'hp_stat': data.stats[0].base_stat,
            'attack_stat': data.stats[1].base_stat,
            'deffense_stat': data.stats[2].base_stat,
        });
    }
    }
    catch (error) {
        console.log(error);
    }
    PokemonModel.deleteMany({ })
    .then(result => {
        console.log(result);
        PokemonModel.create(pokemons)
        .then(console.log('Create done'))
    });
    console.log(`${pokemons.length} documents were created`);
}

async function main () {
    await mongoose.connect(MONGO_URL);
    await populatePokemons();
}

main();