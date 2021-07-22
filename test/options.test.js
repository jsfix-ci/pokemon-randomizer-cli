'ust strict';

const { expect } = require('chai');
const allOptions = require('../lib/options').ALL_OPTIONS;

describe('options', function () {
    describe('ALL_OPTIONS', function () {
        it('should include expected long names', async function () {
            const longNames = ['number', 'evolved', 'type', 'random-type', 'unique', 'file', 'super-effective'];

            longNames.forEach((longName) => {
                expect(allOptions.filter((o) => o.long === longName).length).to.be.eq(1);
            });
            expect(longNames.length).to.be.eq(allOptions.length);
        });
    });
});
