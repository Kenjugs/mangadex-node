const auth = require('../lib/authentication');
const util = require('../lib/util');

test('test authLogin with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    
    const p = auth.authLogin();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authLogin: Parameter `login` cannot be undefined');
    
    spy.mockRestore();
});

test('test authLogin with missing email and username', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
        
    const p = auth.authLogin({ password: 'a' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authLogin: Parameter `login` missing both `login.username` and `login.email`');

    spy.mockRestore();
});

test('test authLogin with missing password', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.authLogin({ username: 'a', email: 'b' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authLogin: Parameter `login` missing required property `login.password`');

    spy.mockRestore();
});

test('test authLogin with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok', token: 'test' });
    });

    const op = {
        username: 'a',
        password: 'c',
    };
    
    const p = auth.authLogin(op).then(res => {
        expect(res).toEqual({result: 'ok', token: 'test'});
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test getAuthCheck with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.getAuthCheck();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getAuthCheck: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test getAuthCheck with missing required property', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.getAuthCheck({ refresh: 'abcd' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getAuthCheck: Parameter `token` missing required property `session`');

    spy.mockRestore();
});

test('test getAuthCheck with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok', isAuthenticated: true });
    });

    const t = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.getAuthCheck(t).then(res => {
        expect(res).toEqual({ result: 'ok', isAuthenticated: true });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test authLogout with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.authLogout();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authLogout: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test authLogout with missing required parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.authLogout({ refresh: 'abcd' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authLogout: Parameter `token` missing required property `session`');

    spy.mockRestore();
});

test('test authLogout with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const t = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.authLogout(t).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test authRefresh with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.authRefresh();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authRefresh: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test authRefresh with missing required parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = auth.authRefresh({ session: 'expired' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - authRefresh: Parameter `token` missing required property `refresh`');

    spy.mockRestore();
});

test('test authRefresh with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const t = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.authRefresh(t).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});
