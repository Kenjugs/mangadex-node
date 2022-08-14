const util = require('../lib/util');
const list = require('../lib/list');

test('test getListId with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getListId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getListId: Parameter `listId` cannot be undefined');

    spy.mockRestore();
});

test('test getListId with blank parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getListId('');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getListId: Parameter `listId` cannot be blank');

    spy.mockRestore();
});

test('test getListId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = list.getListId('test').then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/list/test');

    spy.mockRestore();
});

test('test getUserList with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getUserList();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test getUserList with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getUserList({}, {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');

    spy.mockRestore();
});

test('test getUserList with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = list.getUserList({ session: 'test', refresh: 'abcd' }, { limit: 5 }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/list?limit=5', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getUserIdList with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getUserIdList();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserIdList: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getUserIdList with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getUserIdList('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserIdList: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getUserIdList with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = list.getUserIdList('test-id', { limit: 5 }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/test-id/list?limit=5');

    spy.mockRestore();
});

test('test getListIdFeed with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getListIdFeed();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getListIdFeed: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getListIdFeed with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getListIdFeed('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getListIdFeed: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getListIdFeed with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = list.getListIdFeed('list-id', { offset: 10 }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/list/list-id/feed?offset=10');

    spy.mockRestore();
});
