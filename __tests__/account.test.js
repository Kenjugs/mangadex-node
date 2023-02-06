const util = require('../lib/util');
const account = require('../lib/account');

test('test getAccountAvailable with no parameters', () => {
    const p = account.getAccountAvailable().catch(r => {
        expect(r).toBe('ERROR - getAccountAvailable: Parameter `username` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAccountAvailable with empty username', () => {
    const p = account.getAccountAvailable('').catch(r => {
        expect(r).toBe('ERROR - getAccountAvailable: Parameter `username` cannot be empty');
    });

    expect(p).toBeInstanceOf(Promise);
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

test('test postAccountCreate with no parameters', () => {
    const p = account.postAccountCreate().catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with empty username', () => {
    const p = account.postAccountCreate({ password: 'test', email: 'test' }).catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Request missing required value `username`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with empty password', () => {
    const p = account.postAccountCreate({ username: 'test', email: 'test' }).catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Request missing required value `password`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with empty email', () => {
    const p = account.postAccountCreate({ username: 'test', password: 'test' }).catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Request missing required value `email`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = account.postAccountCreate({ username: 'test', password: 'test', email: 'test' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/account/create', {
        body: {
            username: 'test',
            password: 'test',
            email: 'test'
        }, headers: {
            'Content-Type': 'application/json'
        }
    });

    spy.mockRestore();
});
