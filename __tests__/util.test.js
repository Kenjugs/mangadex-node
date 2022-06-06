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