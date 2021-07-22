const pokeRand = require('pokemon-randomizer');
const input = require('./input');
const output = require('./output');
const logger = require('./logger');

exports.execute = async () => {
    try {
        const options = await input.parseInput();
        const pokemon = await pokeRand.pickRandomPokemon(options);
        output.logPokemon(options, pokemon);
    } catch (err) {
        logger.error(err);
        process.exit(-1);
    }
};
