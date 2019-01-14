'ust strict';

const expect = require('chai').expect;
const allOptions = require('../lib/options').ALL_OPTIONS;

describe('options', async function () {
    describe('ALL_OPTIONS', async function () {
        it('should include expected long names', async function () {
            const longNames = ['number', 'evolved', 'type', 'unique', 'file', 'superEffective'];

            longNames.forEach((longName) => {
                expect(allOptions.filter(o => o.long === longName).length).to.be.eq(1);
            });
            expect(longNames.length).to.be.eq(allOptions.length);
        });
    });
});
