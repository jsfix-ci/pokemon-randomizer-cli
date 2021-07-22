'ust strict';

const { expect } = require('chai');
const Chance = require('chance');

const chance = new Chance();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const _ = require('lodash');
const proxyquire = require('proxyquire');

chai.should();
chai.use(sinonChai);

describe('output', function () {
    let output;
    let stubs;
    let options;
    let pokemon;

    beforeEach(function () {
        options = {
            number: chance.integer({ min: 1, max: 10 }),
        };
        pokemon = [];
        _.times(options.number, () => {
            pokemon.push({
                name: chance.string(),
            });
        });

        stubs = {
            logger: {
                log: sinon.stub(),
            },
        };

        output = proxyquire('../lib/output', {
            './logger': stubs.logger,
        });
    });

    describe('logPokemon', function () {
        it('should call console.log per pokemon', async function () {
            await output.logPokemon(options, pokemon);
            expect(stubs.logger.log).to.have.callCount(options.number + 1);
            _.forEach(pokemon, (poke) => {
                expect(stubs.logger.log).to.have.been.calledWithExactly(poke.name);
            });
        });

        it('should output number of pokemon', async function () {
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number} Pokemon:`;
            expect(stubs.logger.log).to.have.been.calledWithExactly(expected);
        });

        it('should output unique', async function () {
            options.unique = true;
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, unique Pokemon:`;
            expect(stubs.logger.log).to.have.been.calledWithExactly(expected);
        });

        it('should output evolved', async function () {
            options.evolved = true;
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, evolved Pokemon:`;
            expect(stubs.logger.log).to.have.been.calledWithExactly(expected);
        });

        it('should output type', async function () {
            options.type = chance.string();
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, ${options.type} Pokemon:`;
            expect(stubs.logger.log).to.have.been.calledWithExactly(expected);
        });

        it('should output super effective against type', async function () {
            options.superEffective = chance.string();
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, super effective against ${options.superEffective} Pokemon:`;
            expect(stubs.logger.log).to.have.been.calledWithExactly(expected);
        });
    });
});
