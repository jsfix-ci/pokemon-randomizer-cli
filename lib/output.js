'use strict';

const _ = require('lodash');

exports.logPokemon = async (options, pokemon) => {
    exports.logMessage(`Chose ${options.number} Pokemon`);
    _.forEach(pokemon, (poke) => {
        exports.logMessage(poke.name);
    });
};

exports.logMessage = (message) => {
    console.log(message);
};
