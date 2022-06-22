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

    spy.mockRestore();
});

test('test getUserList with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getUserList();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserList: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test getUserList with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = list.getUserList({}, {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserList: Parameter `token` missing required property `session`');

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

    spy.mockRestore();
});
