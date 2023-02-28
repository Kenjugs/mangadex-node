const util = require('../lib/util');
const atHome = require('../lib/atHome');

test('test getAtHomeServerChapterId with blank parameters', () => {
    const p = atHome.getAtHomeServerChapterId().catch(r => {
        expect(r).toBe('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAtHomeServerChapterId with invalid parameters', () => {
    const p = atHome.getAtHomeServerChapterId('',{}).catch(r => {
        expect(r).toBe('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAtHomeServerChapterId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = atHome.getAtHomeServerChapterId('test-id', { forcePort443: true }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/at-home/server/test-id?forcePort443=true');

    spy.mockRestore();
});
