const util = require('../lib/util');
const manga = require('../lib/manga');

test('test getSearchManga with no parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getSearchManga().then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga');

    spyOn.mockRestore();
});

test('test getSearchManga with blank parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getSearchManga({}).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga');

    spyOn.mockRestore();
});

test('test getSearchManga with valid parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getSearchManga({ title: 'test' }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga?title=test');

    spyOn.mockRestore();
});

test('test getMangaStatus with no parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaStatus();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaStatus: Parameter `token` cannot be undefined');

    spyOn.mockRestore();
});

test('test getMangaStatus with blank parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaStatus({}, '');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaStatus: Parameter `token` missing required property `session`');

    spyOn.mockRestore();
});

test('test getMangaStatus with valid parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaStatus({ session: 'test' }, 'completed').then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/status?status=completed', { headers: { Authorization: 'Bearer test' } });

    spyOn.mockRestore();
});

test('test getMangaIdFeed with no parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdFeed();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdFeed: Parameter `id` cannot be undefined');

    spyOn.mockRestore();
});

test('test getMangaIdFeed with blank parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdFeed('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdFeed: Parameter `id` cannot be blank');

    spyOn.mockRestore();
});

test('test getMangaIdFeed with valid parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaIdFeed('manga-id', { limit: 3 }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id/feed?limit=3');

    spyOn.mockRestore();
});

test('test getMangaIdAggregate with no parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdAggregate();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdAggregate: Parameter `id` cannot be undefined');

    spyOn.mockRestore();
});

test('test getMangaIdAggregate with blank parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdAggregate('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdAggregate: Parameter `id` cannot be blank');

    spyOn.mockRestore();
});

test('test getMangaIdAggregate with valid parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaIdAggregate('manga-id', { groups: ['group1-id'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id/aggregate?groups[]=group1-id');

    spyOn.mockRestore();
});

test('test getMangaId with no parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaId: Parameter `id` cannot be undefined');

    spyOn.mockRestore();
});

test('test getMangaId with blank parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaId('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaId: Parameter `id` cannot be blank');

    spyOn.mockRestore();
});

test('test getMangaId with valid parameters', () => {
    const spyOn = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaId('manga-id', { includes: ['cover_art'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id?includes[]=cover_art');

    spyOn.mockRestore();
});
