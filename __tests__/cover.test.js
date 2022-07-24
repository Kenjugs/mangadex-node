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
    const spy = jest.spyOn(console, 'error').mockImplementation();
    
    const p = cover.getCoverId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getCoverId: Parameter `id` cannot be undefined');
    
    spy.mockRestore();
});

test('test getCoverId with bad id parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = cover.getCoverId('');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getCoverId: Parameter `id` cannot be blank');

    spy.mockRestore();
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
