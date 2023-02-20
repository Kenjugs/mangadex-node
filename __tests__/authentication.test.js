const auth = require('../lib/authentication');
const util = require('../lib/util');

test('test postAuthLogin with no parameters', () => {
    const p = auth.postAuthLogin().catch(r => {
        expect(r).toBe('ERROR - postAuthLogin: Parameter `login` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthLogin with missing email and username', () => {
    const p = auth.postAuthLogin({ password: 'a' }).catch(r => {
        expect(r).toBe('ERROR - postAuthLogin: Parameter `login` missing both `login.username` and `login.email`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthLogin with missing password', () => {
    const p = auth.postAuthLogin({ username: 'a', email: 'b' }).catch(r => {
        expect(r).toBe('ERROR - postAuthLogin: Parameter `login` missing required property `login.password`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthLogin with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok', token: 'test' });
    });

    const options = {
        username: 'a',
        password: 'c',
    };

    const p = auth.postAuthLogin(options).then(res => {
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

test('test postAuthLogout with no parameters', () => {
    const p = auth.postAuthLogout().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthLogout with missing required parameter', () => {
    const p = auth.postAuthLogout({ refresh: 'abcd' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthLogout with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const token = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.postAuthLogout(token).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/auth/logout', { headers: { Authorization: 'Bearer abcd' } });

    spy.mockRestore();
});

test('test postAuthRefresh with no parameters', () => {
    const p = auth.postAuthRefresh().catch(r => {
        expect(r).toBe('ERROR - postAuthRefresh: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthRefresh with missing required parameter', () => {
    const p = auth.postAuthRefresh({ session: 'expired' }).catch(r => {
        expect(r).toBe('ERROR - postAuthRefresh: Parameter `token` missing required property `refresh`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthRefresh with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const token = {
        session: 'abcd',
        refresh: 'efgh',
    };

    const p = auth.postAuthRefresh(token).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/auth/refresh', { body: { token: 'efgh' }, headers: { 'Content-Type': 'application/json' } });

    spy.mockRestore();
});
