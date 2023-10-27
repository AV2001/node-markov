const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    test('makeChains method creates a chain map', () => {
        let mm = new MarkovMachine('the cat in the hat');
        expect(mm.chains).toEqual({
            the: ['cat', 'hat'],
            cat: ['in'],
            in: ['the'],
            hat: [null],
        });
    });

    test('makeText method returns a string', () => {
        let mm = new MarkovMachine('the cat in the hat');
        let text = mm.makeText();
        expect(typeof text).toBe('string');
    });

    test('makeText output starts with a capital letter word', () => {
        let mm = new MarkovMachine('The cat in the hat');
        let text = mm.makeText();
        let firstWord = text.split(' ')[0];
        expect(firstWord[0]).toMatch(/[A-Z]/);
    });

    test('makeText method returns a reasonable length string', () => {
        let mm = new MarkovMachine('the cat in the hat');
        let text = mm.makeText(50);
        expect(text.split(' ').length).toBeLessThanOrEqual(50);
    });
});
