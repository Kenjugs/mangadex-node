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
