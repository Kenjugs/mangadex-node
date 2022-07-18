const util = require('../lib/util');
const cover = require('../lib/cover');

test('test getCover with no parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });
    
    const p = cover.getCover().then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test getCover with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });
    
    const p = cover.getCover({ manga: ['test-manga-id'], limit: 50 }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});
