const follows = require('../lib/follows');
const util = require('../lib/util');

test('test getUserFollowsGroup with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = follows.getUserFollowsGroup();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');

    spy.mockRestore();
});

test('test getUserFollowsGroup with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = follows.getUserFollowsGroup({ session: 'test' }, { limit: 25 }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/follows/group?limit=25', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getUserFollowsGroupId with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = follows.getUserFollowsGroupId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserFollowsGroupId: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getUserFollowsGroupId with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = follows.getUserFollowsGroupId('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getUserFollowsGroupId: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getUserFollowsGroupId with blank authorization token', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = follows.getUserFollowsGroupId('group-id', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');

    spy.mockRestore();
});

test('test getUserFollowsGroupId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = follows.getUserFollowsGroupId('group-id', { session: 'test' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/follows/group/group-id', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});
