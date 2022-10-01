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

test('test getMangaStatus with no parameters', () => {
    const p = manga.getMangaStatus().catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
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
    const p = manga.getMangaIdFeed().catch(r => {
        expect(r).toBe('ERROR - getMangaIdFeed: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaIdFeed with blank parameters', () => {
    const p = manga.getMangaIdFeed('', {}).catch(r => {
        expect(r).toBe('ERROR - getMangaIdFeed: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
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
    const p = manga.getMangaIdAggregate().catch(r => {
        expect(r).toBe('ERROR - getMangaIdAggregate: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaIdAggregate with blank parameters', () => {
    const p = manga.getMangaIdAggregate('', {}).catch(r => {
        expect(r).toBe('ERROR - getMangaIdAggregate: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
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
    const p = manga.getMangaId().catch(r => {
        expect(r).toBe('ERROR - getMangaId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaId with blank parameters', () => {
    const p = manga.getMangaId('', {}).catch(r => {
        expect(r).toBe('ERROR - getMangaId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
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

test('test getMangaIdReadMarkers with no token', () => {
    const p = manga.getMangaIdReadMarkers({}, 'test-id').catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaIdReadMarkers with no id parameter', () => {
    const p = manga.getMangaIdReadMarkers({ session: 'test' }).catch(r => {
        expect(r).toBe('ERROR - getMangaIdReadMarkers: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaIdReadMarkers with blank id parameter', () => {
    const p = manga.getMangaIdReadMarkers({ session: 'test' }, '').catch(r => {
        expect(r).toBe('ERROR - getMangaIdReadMarkers: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
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

test('test getMangaReadMarkers with no token', () => {
    const p = manga.getMangaReadMarkers({}, { ids: ['id1'] }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaReadMarkers with no id parameter', () => {
    const p = manga.getMangaReadMarkers({ session: 'test' }).catch(r => {
        expect(r).toBe('ERROR - getMangaReadMarkers: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getMangaReadMarkers with blank id parameter', () => {
    const p = manga.getMangaReadMarkers({ session: 'test' }, {}).catch(r => {
        expect(r).toBe('ERROR - getMangaReadMarkers: Parameter `options` missing required property `ids`');
    });

    expect(p).toBeInstanceOf(Promise);
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
