'ust strict';

const expect = require('chai').expect;
const Chance = require('chance');
const chance = new Chance();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');

chai.should();
chai.use(sinonChai);

describe('run', async function () {
    let run;
    let stubs;
    let options;
    let pokemon;

    beforeEach(async function () {
        options = chance.string();
        pokemon = chance.string();
        stubs = {
            inputStub: {
                parseInput: sinon.stub().resolves(options),
            },
            outputStub: {
                logPokemon: sinon.stub().resolves(),
            },
            pokeRandStub: {
                pickRandomPokemon: sinon.stub().resolves(pokemon),
            },
        };

        run = proxyquire('../lib/run', {
            './input': stubs.inputStub,
            './output': stubs.outputStub,
            'pokemon-randomizer': stubs.pokeRandStub,
        });
    });

    it('should call input', async function () {
        await run.execute();
        expect(stubs.inputStub.parseInput).to.have.callCount(1);
        expect(stubs.inputStub.parseInput).to.have.been.calledWithExactly();
    });

    it('should call pickRandomPokemon', async function () {
        await run.execute();
        expect(stubs.pokeRandStub.pickRandomPokemon).to.have.callCount(1);
        expect(stubs.pokeRandStub.pickRandomPokemon).to.have.been.calledWithExactly(options);
    });

    it('should call output', async function () {
        await run.execute();
        expect(stubs.outputStub.logPokemon).to.have.callCount(1);
        expect(stubs.outputStub.logPokemon).to.have.been.calledWithExactly(options, pokemon);
    });
});
