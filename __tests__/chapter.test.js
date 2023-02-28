const util = require('../lib/util');
const chapter = require('../lib/chapter');

test('test getChapter with no parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.getChapter().then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test getChapter with non-blank parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.getChapter({ limit: 5, translatedLanguage: ['en'], volume: ['1', '2'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/chapter?limit=5&translatedLanguage[]=en&volume[]=1&volume[]=2');

    spy.mockRestore();
});

test('test getChapterId with no parameters', () => {
    const p = chapter.getChapterId().catch(r => {
        expect(r).toBe('ERROR - getChapterId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getChapterId with blank parameters', () => {
    const p = chapter.getChapterId('', {}).catch(r => {
        expect(r).toBe('ERROR - getChapterId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
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

test('test putChapterId with no parameters', () => {
    const p = chapter.putChapterId().catch(r => {
        expect(r).toBe('ERROR - putChapterId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putChapterId with invalid id', () => {
    const p = chapter.putChapterId('').catch(r => {
        expect(r).toBe('ERROR - putChapterId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putChapterId with no options', () => {
    const p = chapter.putChapterId('test').catch(r => {
        expect(r).toBe('ERROR - putChapterId: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putChapterId with invalid options', () => {
    const p = chapter.putChapterId('test', { title: 'new title' }).catch(r => {
        expect(r).toBe('ERROR - putChapterId: Parameter `options` missing required property `version`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putChapterId with missing token', () => {
    const p = chapter.putChapterId('test', { title: 'new title', version: '2' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putChapterId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = chapter.putChapterId('test', { title: 'new title', version: '2' }, { session: 'session' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('PUT', '/chapter/test', { body: { title: 'new title', version: '2' }, headers: { Authorization: 'Bearer session', 'Content-Type': 'application/json' } });

    spy.mockRestore();
});
