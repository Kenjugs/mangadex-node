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
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/cover');

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
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/cover?manga[]=test-manga-id&limit=50');

    spy.mockRestore();
});

test('test getCoverId with no parameters', () => {
    const p = cover.getCoverId().catch(r => {
        expect(r).toBe('ERROR - getCoverId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getCoverId with bad id parameter', () => {
    const p = cover.getCoverId('').catch(r => {
        expect(r).toBe('ERROR - getCoverId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getCoverId with good parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = cover.getCoverId('test', { includes: ['test'] }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/cover/test?includes[]=test');

    spy.mockRestore();
});
