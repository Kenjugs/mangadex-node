const util = require('../lib/util');
const user = require('../lib/user');

test('test getUsers with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = user.getUsers();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUsers: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test getUsers with missing required parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = user.getUsers({ test: 'test' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUsers: Parameter `token` missing required property `session`');

    spy.mockRestore();
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
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = user.getUserId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserId: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getUserId with blank parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = user.getUserId('');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserId: Parameter `id` cannot be blank');

    spy.mockRestore();
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
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = user.getUserFollowedMangaFeed();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserFollowedMangaFeed: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test getUserFollowedMangaFeed with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = user.getUserFollowedMangaFeed({}, {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserFollowedMangaFeed: Parameter `token` missing required property `session`');

    spy.mockRestore();
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
