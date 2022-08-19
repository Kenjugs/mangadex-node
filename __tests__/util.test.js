const util = require('../lib/util');
const https = require('https');
const { EventEmitter } = require('stream');

test('test buildQueryStringFromOptions with static data', () => {
    const options = {
        a: 1,
        b: 'two',
        c: 3.55,
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('?a=1&b=two&c=3.55');
});

test('test buildQueryStringFromOptions with array data', () => {
    const options = {
        a: [
            'one',
            'two',
            'thr',
        ],
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('?a[]=one&a[]=two&a[]=thr');
});

test('test buildQueryStringFromOptions with empty array', () => {
    const options = {
        a: [],
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('');
});

test('test buildQueryStringFromOptions with object data', () => {
    const options = {
        order: {
            a: 'asc',
            b: 'desc',
            c: 'desc',
        },
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('?order[a]=asc&order[b]=desc&order[c]=desc');
});

test('test buildQueryStringFromOptions with empty object', () => {
    const options = {
        order: {},
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('');
});

test('test buildQueryStringFromOptions with date data', () => {
    const d = new Date(Date.UTC(1990, 0, 15, 13, 22, 47));
    const options = {
        d: d,
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('?d=1990-01-15T13:22:47');
});

test('test buildQueryStringFromOptions with invalid date', () => {
    const d = new Date('1990-13-32');
    const options = {
        d: d,
    };
    const s = util.buildQueryStringFromOptions(options);
    expect(s).toBe('');
});

test('test buildQueryStringFromOptions with undefined options', () => {
    const s = util.buildQueryStringFromOptions();
    expect(s).toBe('');
});

test('test buildQueryStringFromOptions with blank options', () => {
    const s = util.buildQueryStringFromOptions({});
    expect(s).toBe('');
});

test('test createHttpsRequestPromise with no parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = util.createHttpsRequestPromise();
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - createHttpsRequestPromise: Parameter `method` cannot be undefined');

    spy.mockRestore();
});

test('test createHttpsRequestPromise with missing required parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = util.createHttpsRequestPromise('get');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - createHttpsRequestPromise: Parameter `path` cannot be undefined');

    spy.mockRestore();
});

test('test createHttpsRequestPromise with blank parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const p = util.createHttpsRequestPromise('');
    expect(p).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - createHttpsRequestPromise: Parameter `method` cannot be blank');

    const q = util.createHttpsRequestPromise('test', '');
    expect(q).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - createHttpsRequestPromise: Parameter `path` cannot be blank');

    spy.mockRestore();
});

test('test createHttpsRequestPromise successful resolve', () => {
    const spy = jest.spyOn(https, 'request').mockImplementation((options, callback) => {
        const incomingMessage = new EventEmitter();
        callback(incomingMessage);
        incomingMessage.emit('data', '{ "result": "ok", ');
        incomingMessage.emit('data', '"status": "dummy API call"');
        incomingMessage.emit('data', ' }');
        incomingMessage.emit('end');
        return {
            write: () => null,
            end: () => null,
            on: () => jest.fn(done => done()),
        };
    });

    const options = {
        body: {
            a: 'hello',
            b: 'world',
        },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const p = util.createHttpsRequestPromise('POST', '/path', options).then(data => {
        const expected = JSON.parse('{ "result": "ok", "status": "dummy API call" }');
        expect(data).toEqual(expected);
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test createHttpsRequestPromise error', () => {
    const spy = jest.spyOn(https, 'request').mockImplementation((options, callback) => {
        const incomingMessage = new EventEmitter();
        callback(incomingMessage);
        incomingMessage.emit('error', 'error message');
        incomingMessage.emit('end');
        return {
            write: () => null,
            end: () => null,
            on: () => jest.fn(done => done()),
        };
    });

    const options = {
        body: {
            a: 'hello',
            b: 'world',
        },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const p = util.createHttpsRequestPromise('POST', '/path', options).catch(reason => {
        expect(reason).toBe('error message');
    });

    expect(p).toBeInstanceOf(Promise);

    spy.mockRestore();
});

test('test addTokenAuthorization with no parameters', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();
    
    const o = util.addTokenAuthorization();
    expect(o).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
    
    spyOn.mockRestore();
});

test('test addTokenAuthorization with missing session property on token', () => {
    const spyOn = jest.spyOn(console, 'error').mockImplementation();
    
    const o = util.addTokenAuthorization({});
    expect(o).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    
    spyOn.mockRestore();
});

test('test addTokenAuthorization with valid parameters', () => {
    const r = {
        body: {
            ids: ['id1', 'id2'],
            limit: 10,
        },
    };

    const o = util.addTokenAuthorization({ session: 'test' }, r);

    expect(o).toEqual({
        body: {
            ids: ['id1', 'id2'],
            limit: 10,
        },
        headers: {
            Authorization: `Bearer test`,
        },
    });

    expect(r).toEqual({
        body: {
            ids: ['id1', 'id2'],
            limit: 10,
        },
    });
});

test('test isErrorResponse with non-matching type', () => {
    const s = 'hello';
    const t = util.isErrorResponse(s);
    expect(t).toBe(false);
});

test('test isErrorResponse with matching type', () => {
    const fn = jest.fn(() => {
        return { result: 'error', errors: ['error1', 'error2', 'error3'] };
    });

    const x = fn();
    const t = util.isErrorResponse(x);
    expect(t).toBe(true);
});
