const util = require('../lib/util');
const group = require('../lib/group');

test('test getSearchGroup with no parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = group.getSearchGroup().then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/group');

    spy.mockRestore();
});

test('test getSearchGroup with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const options = {
        name: 'test'
    };

    const p = group.getSearchGroup(options).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/group?name=test');

    spy.mockRestore();
});

test('test getGroupId with no parameters', () => {
    const p = group.getGroupId().catch(r => {
        expect(r).toBe('ERROR - getGroupId: Parameter `groupId` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getGroupId with blank parameters', () => {
    const p = group.getGroupId('', {}).catch(r => {
        expect(r).toBe('ERROR - getGroupId: Parameter `groupId` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getGroupId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = group.getGroupId('test', {}).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/group/test');

    spy.mockRestore();
});
