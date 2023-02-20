const util = require('../lib/util');
const author = require('../lib/author');

test('test getAuthor with no parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = author.getAuthor().then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/author');

    spy.mockRestore();
});

test('test getAuthor with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = author.getAuthor({ limit: 15, order: { name: 'asc' } }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/author?limit=15&order[name]=asc');

    spy.mockRestore();
});

test('test postAuthor with no parameters', () => {
    const p = author.postAuthor().catch(r => {
        expect(r).toBe('ERROR - postAuthor: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthor with invalid parameters', () => {
    const p = author.postAuthor({ test: 'value' }).catch(r => {
        expect(r).toBe('ERROR - postAuthor: Parameter `options` missing required property `name`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthor with no token parameter', () => {
    const p = author.postAuthor({ name: 'test' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAuthor with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = author.postAuthor({ name: 'test' }, { session: 'session-id' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/author', { body: { name: 'test' }, headers: { Authorization: 'Bearer session-id', 'Content-Type': 'application/json' } });

    spy.mockRestore();
});

test('test getAuthorId with no parameters', () => {
    const p = author.getAuthorId().catch(r => {
        expect(r).toBe('ERROR - getAuthorId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAuthorId with invalid parameters', () => {
    const p = author.getAuthorId('', {}).catch(r => {
        expect(r).toBe('ERROR - getAuthorId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAuthorId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });
    
    const p = author.getAuthorId('test-id', { includes: ['test'] }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });
    
    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/author/test-id?includes[]=test');
    
    spy.mockRestore();
});

test('test putAuthorId with no parameters', () => {
    const p = author.putAuthorId().catch(r => {
        expect(r).toBe('ERROR - putAuthorId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putAuthorId with invalid id parameter', () => {
    const p = author.putAuthorId('').catch(r => {
        expect(r).toBe('ERROR - putAuthorId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putAuthorId with no options parameter', () => {
    const p = author.putAuthorId('author-id').catch(r => {
        expect(r).toBe('ERROR - putAuthorId: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putAuthorId with invalid options parameter', () => {
    const p = author.putAuthorId('author-id', { name: 'test' }).catch(r => {
        expect(r).toBe('ERROR - putAuthorId: Parameter `options` missing required property `version`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putAuthorId with no token parameter', () => {
    const p = author.putAuthorId('author-id', { version: 'test' }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test putAuthorId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = author.putAuthorId('author-id', { version: 1 }, { session: 'session-id' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('PUT', '/author/author-id', { body: { version: 1 }, headers: { Authorization: 'Bearer session-id', 'Content-Type': 'application/json' } });

    spy.mockRestore();
});

test('test deleteAuthorId with no parameters', () => {
    const p = author.deleteAuthorId().catch(r => {
        expect(r).toBe('ERROR - deleteAuthorId: Parameter `id` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test deleteAuthorId with invalid id parameter', () => {
    const p = author.deleteAuthorId('').catch(r => {
        expect(r).toBe('ERROR - deleteAuthorId: Parameter `id` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test deleteAuthorId with no token parameter', () => {
    const p = author.deleteAuthorId('author-id').catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test deleteAuthorId with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = author.deleteAuthorId('author-id', { session: 'session-id' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('DELETE', '/author/author-id', { headers: { Authorization: 'Bearer session-id' } });

    spy.mockRestore();
});
