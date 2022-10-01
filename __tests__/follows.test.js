const follows = require('../lib/follows');
const util = require('../lib/util');

test('test getUserFollowsGroup with no parameters', () => {
    const p = follows.getUserFollowsGroup().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });
    
    expect(p).toBeInstanceOf(Promise);
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
    const p = follows.getUserFollowsGroupId().catch(r => {
        expect(r).toBe('ERROR - getUserFollowsGroupId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowsGroupId with blank parameters', () => {
    const p = follows.getUserFollowsGroupId('', {}).catch(r => {
        expect(r).toBe('ERROR - getUserFollowsGroupId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowsGroupId with blank authorization token', () => {
    const p = follows.getUserFollowsGroupId('group-id', {}).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
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

test('test getUserFollowsUser with no parameters', () => {
    const p = follows.getUserFollowsUser().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getUserFollowsUser with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = follows.getUserFollowsUser({ session: 'test' }, { offset: 0 }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/user/follows/user?offset=0', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});
