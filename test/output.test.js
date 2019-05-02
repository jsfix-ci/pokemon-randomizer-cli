'ust strict';

const expect = require('chai').expect;
const Chance = require('chance');
const chance = new Chance();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const output = require('../lib/output');
const _ = require('lodash');

chai.should();
chai.use(sinonChai);

describe('output', async function () {
    let stub;
    let options;
    let pokemon;

    beforeEach(function () {
        stub = sinon.stub(output, 'logMessage');
        options = {
            number: chance.integer({ min: 1, max: 10 }),
        };
        pokemon = [];
        _.times(options.number, (n) => {
            pokemon.push({
                name: chance.string()
            });
        });
    });

    afterEach(function () {
        stub.restore();
    });

    describe('logPokemon', async function () {
        it('should call console.log per pokemon', async function () {
            await output.logPokemon(options, pokemon);
            expect(stub).to.have.callCount(options.number + 1);
            _.forEach(pokemon, (poke) => {
                expect(stub).to.have.been.calledWithExactly(poke.name);
            });
        });

        it('should output number of pokemon', async function () {
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number} Pokemon`;
            expect(stub).to.have.been.calledWithExactly(expected);
        });

        it('should output unique', async function () {
            options.unique = true;
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, unique Pokemon`;
            expect(stub).to.have.been.calledWithExactly(expected);
        });

        it('should output evolved', async function () {
            options.evolved = true;
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, evolved Pokemon`;
            expect(stub).to.have.been.calledWithExactly(expected);
        });

        it('should output type', async function () {
            options.type = chance.string();
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, ${options.type} Pokemon`;
            expect(stub).to.have.been.calledWithExactly(expected);
        });

        it('should output super effective against type', async function () {
            options.superEffective = chance.string();
            await output.logPokemon(options, pokemon);
            const expected = `Picked ${options.number}, super effective against ${options.superEffective} Pokemon`;
            expect(stub).to.have.been.calledWithExactly(expected);
        });
    });
});
