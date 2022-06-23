const util = require('../lib/util');
const account = require('../lib/account');

test('test getAccountAvailable with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = account.getAccountAvailable();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getAccountAvailable: Parameter `username` cannot be undefined');

    spy.mockRestore();
});

test('test getAccountAvailable with empty username', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = account.getAccountAvailable('');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getAccountAvailable: Parameter `username` cannot be empty');

    spy.mockRestore();
});

test('test getAccountAvailable with valid parameter', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ available: true });
    });

    const p = account.getAccountAvailable('test').then(res => {
        expect(res).toEqual({ available: true });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/account/available?username=test');

    spy.mockRestore();
});
