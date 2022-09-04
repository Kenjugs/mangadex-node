const util = require('../lib/util');
const manga = require('../lib/manga');

test('test getSearchManga with no parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getSearchManga().then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga');

    spy.mockRestore();
});

test('test getSearchManga with blank parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getSearchManga({}).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga');

    spy.mockRestore();
});

test('test getSearchManga with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getSearchManga({ title: 'test' }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga?title=test');

    spy.mockRestore();
});

test('test getMangaStatus with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaStatus({ session: 'test' }, 'completed').then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/status?status=completed', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getMangaIdFeed with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdFeed();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdFeed: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getMangaIdFeed with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdFeed('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdFeed: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getMangaIdFeed with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaIdFeed('manga-id', { limit: 3 }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id/feed?limit=3');

    spy.mockRestore();
});

test('test getMangaIdAggregate with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdAggregate();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdAggregate: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getMangaIdAggregate with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdAggregate('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdAggregate: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getMangaIdAggregate with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaIdAggregate('manga-id', { groups: ['group1-id'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id/aggregate?groups[]=group1-id');

    spy.mockRestore();
});

test('test getMangaId with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaId();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaId: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getMangaId with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaId('', {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaId: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getMangaId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaId('manga-id', { includes: ['cover_art'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id?includes[]=cover_art');

    spy.mockRestore();
});

test('test getMangaIdReadMarkers with no id parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdReadMarkers({ session: 'test' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdReadMarkers: Parameter `id` cannot be undefined');

    spy.mockRestore();
});

test('test getMangaIdReadMarkers with blank id parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaIdReadMarkers({ session: 'test' }, '');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaIdReadMarkers: Parameter `id` cannot be blank');

    spy.mockRestore();
});

test('test getMangaIdReadMarkers with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaIdReadMarkers({ session: 'test' }, 'manga-id').then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/manga-id/read', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getMangaReadMarkers with no id parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaReadMarkers({ session: 'test' });
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaReadMarkers: Parameter `options` cannot be undefined');

    spy.mockRestore();
});

test('test getMangaReadMarkers with blank id parameter', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = manga.getMangaReadMarkers({ session: 'test' }, {});
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - getMangaReadMarkers: Parameter `options` missing required property `ids`');

    spy.mockRestore();
});

test('test getMangaReadMarkers with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaReadMarkers({ session: 'test' }, { ids: ['id1', 'id2'] }).then((res) => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/read?ids[]=id1&ids[]=id2', { headers: { Authorization: 'Bearer test' } });

    spy.mockRestore();
});

test('test getMangaRandom with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaRandom({ contentRating: [manga.MangaContentRating.SAFE] }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/random?contentRating[]=safe');

    spy.mockRestore();
});

test('test getMangaTag with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = manga.getMangaTag().then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/manga/tag');

    spy.mockRestore();
});
