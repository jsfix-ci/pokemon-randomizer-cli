'use strict';

const input = require('./input');
const output = require('./output');
const pokeRand = require('pokemon-randomizer');

Promise.resolve()
    .then(() => input.parseInput())
    .then((options) => {
        return pokeRand.pickRandomPokemon(options)
            .then((pokemon) => output.logPokemon(options, pokemon));
    })
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
