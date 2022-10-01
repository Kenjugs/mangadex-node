const util = require('../lib/util');
const user = require('../lib/user');

test('test getUsers with no parameters', () => {
    const p = user.getUsers().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUsers with missing required parameters', () => {
    const p = user.getUsers({ test: 'test' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUsers with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = user.getUsers({ session: 'test', refresh: 'test' }, { limit: 5, username: 'steve' }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    })

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user?limit=5&username=steve', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getUserId with no parameter', () => {
    const p = user.getUserId().catch(r => {
        expect(r).toBe('ERROR - getUserId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserId with blank parameter', () => {
    const p = user.getUserId('').catch(r => {
        expect(r).toBe('ERROR - getUserId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = user.getUserId('test-id').then((res) => {
        expect(res).toEqual({ result: 'ok' });
    })

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/test-id');

    spy.mockRestore();
});

test('test getUserFollowedMangaFeed with no parameters', () => {
    const p = user.getUserFollowedMangaFeed().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowedMangaFeed with blank parameters', () => {
    const p = user.getUserFollowedMangaFeed({}, {}).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowedMangaFeed with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = user.getUserFollowedMangaFeed({ session: 'test' }, { order: { chapter: 'asc' } }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    })

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/follows/manga/feed?order[chapter]=asc', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getUserFollowedManga with no parameters', () => {
    const p = user.getUserFollowedManga().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowedManga with blank parameters', () => {
    const p = user.getUserFollowedManga({}, {}).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowedManga with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = user.getUserFollowedManga({ session: 'asdf', refresh: 'jkl;' }, { offset: 50 }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/follows/manga?offset=50', { headers: { Authorization: 'Bearer asdf' } });

    spy.mockRestore();
});

test('test getUserMe with no parameters', () => {
    const p = user.getUserMe().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserMe with blank parameters', () => {
    const p = user.getUserMe({}).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserMe with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = user.getUserMe({ session: 'test' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/me', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});
