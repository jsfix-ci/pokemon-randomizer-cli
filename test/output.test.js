'ust strict';

const expect = require('chai').expect;
const Chance = require('chance');
const chance = new Chance();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');
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

        it('should list options used', async function () {
            await output.logPokemon(options, pokemon);
            const expected = `Chose ${options.number} Pokemon`;
            expect(stub).to.have.been.calledWithExactly(expected);
        });
    });
});
