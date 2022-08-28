const util = require('../lib/util');
const chapter = require('../lib/chapter');

test('test getChapters with no parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.getChapters().then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test getChapters with non-blank parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.getChapters({ limit: 5, translatedLanguage: ['en'], volume: ['1', '2'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/chapter?limit=5&translatedLanguage[]=en&volume[]=1&volume[]=2');

    spy.mockRestore();
});

test('test getChapterId with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = chapter.getChapterId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getChapterId: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getChapterId with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = chapter.getChapterId('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getChapterId: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getChapterId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.getChapterId('test').then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/chapter/test');

    spy.mockRestore();
});

test('test getAtHomeServerChapterId with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = chapter.getAtHomeServerChapterId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be undefined');

    spy.mockRestore();
});

test('test getAtHomeServerChapterId with invalid parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = chapter.getAtHomeServerChapterId('',{});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be blank');

    spy.mockRestore();
});

test('test getAtHomeServerChapterId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.getAtHomeServerChapterId('test-id', { forcePort443: true }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/at-home/server/test-id?forcePort443=true');

    spy.mockRestore();
});
