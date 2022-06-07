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
    
    spy.mockRestore();
});

test('test getGroupId with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = group.getGroupId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getGroupId: Parameter `groupId` cannot be undefined');

    spy.mockRestore();
});

test('test getGroupId with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = group.getGroupId('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getGroupId: Parameter `groupId` cannot be blank');

    spy.mockRestore();
});

test('test getGroupId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = group.getGroupId('test', '').then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});
