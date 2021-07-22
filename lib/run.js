const pokeRand = require('pokemon-randomizer');
const input = require('./input');
const output = require('./output');

exports.execute = async () => {
    try {
        const options = await input.parseInput();
        const pokemon = await pokeRand.pickRandomPokemon(options);
        output.logPokemon(options, pokemon);
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }
};
