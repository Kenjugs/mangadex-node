const auth = require('../lib/authentication');
const util = require('../lib/util');

test('test authLogin with no parameters', () => {
    const p = auth.authLogin().catch(r => {
        expect(r).toBe('ERROR - authLogin: Parameter `login` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test authLogin with missing email and username', () => {
    const p = auth.authLogin({ password: 'a' }).catch(r => {
        expect(r).toBe('ERROR - authLogin: Parameter `login` missing both `login.username` and `login.email`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test authLogin with missing password', () => {
    const p = auth.authLogin({ username: 'a', email: 'b' }).catch(r => {
        expect(r).toBe('ERROR - authLogin: Parameter `login` missing required property `login.password`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test authLogin with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok', token: 'test' });
    });

    const options = {
        username: 'a',
        password: 'c',
    };

    const p = auth.authLogin(options).then(res => {
        expect(res).toEqual({ result: 'ok', token: 'test' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/auth/login', { body: options, headers: { 'Content-Type': 'application/json' } });

    spy.mockRestore();
});

test('test getAuthCheck with no parameters', () => {
    const p = auth.getAuthCheck().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test getAuthCheck with missing required property', () => {
    const p = auth.getAuthCheck({ refresh: 'abcd' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test getAuthCheck with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok', isAuthenticated: true });
    });

    const token = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.getAuthCheck(token).then(res => {
        expect(res).toEqual({ result: 'ok', isAuthenticated: true });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/auth/check', { headers: { Authorization: 'Bearer abcd' } });

    spy.mockRestore();
});

test('test authLogout with no parameters', () => {
    const p = auth.authLogout().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test authLogout with missing required parameter', () => {
    const p = auth.authLogout({ refresh: 'abcd' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test authLogout with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const token = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.authLogout(token).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/auth/logout', { headers: { Authorization: 'Bearer abcd' } });

    spy.mockRestore();
});

test('test authRefresh with no parameters', () => {
    const p = auth.authRefresh().catch(r => {
        expect(r).toBe('ERROR - authRefresh: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test authRefresh with missing required parameter', () => {
    const p = auth.authRefresh({ session: 'expired' }).catch(r => {
        expect(r).toBe('ERROR - authRefresh: Parameter `token` missing required property `refresh`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test authRefresh with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const token = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.authRefresh(token).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/auth/refresh', { body: { token: 'efgh' }, headers: { 'Content-Type': 'application/json' } });

    spy.mockRestore();
});
