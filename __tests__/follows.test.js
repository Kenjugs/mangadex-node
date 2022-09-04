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
