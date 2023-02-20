const util = require('../lib/util');
const account = require('../lib/account');

test('test getAccountAvailable with no parameters', () => {
    const p = account.getAccountAvailable().catch(r => {
        expect(r).toBe('ERROR - getAccountAvailable: Parameter `username` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAccountAvailable with empty username', () => {
    const p = account.getAccountAvailable('').catch(r => {
        expect(r).toBe('ERROR - getAccountAvailable: Parameter `username` cannot be empty');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAccountAvailable with valid parameter', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ available: true });
    });

    const p = account.getAccountAvailable('test').then(res => {
        expect(res).toEqual({ available: true });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('GET', '/account/available?username=test');

    spy.mockRestore();
});

test('test postAccountCreate with no parameters', () => {
    const p = account.postAccountCreate().catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with empty username', () => {
    const p = account.postAccountCreate({ password: 'test', email: 'test' }).catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Request missing required value `username`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with empty password', () => {
    const p = account.postAccountCreate({ username: 'test', email: 'test' }).catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Request missing required value `password`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with empty email', () => {
    const p = account.postAccountCreate({ username: 'test', password: 'test' }).catch(r => {
        expect(r).toBe('ERROR - postAccountCreate: Request missing required value `email`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountCreate with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = account.postAccountCreate({ username: 'test', password: 'test', email: 'test' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/account/create', {
        body: {
            username: 'test',
            password: 'test',
            email: 'test'
        }, headers: {
            'Content-Type': 'application/json'
        }
    });

    spy.mockRestore();
});

test('test getAccountActivateCode with no parameters', () => {
    const p = account.getAccountActivateCode().catch(r => {
        expect(r).toBe('ERROR - getAccountActivateCode: Parameter `code` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAccountActivateCode with invalid format code', () => {
    const p = account.getAccountActivateCode('abcdefg').catch(r => {
        expect(r).toBe('ERROR - getAccountActivateCode: Invalid format for parameter `code`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test getAccountActivateCode with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = account.getAccountActivateCode('0acb9-45e1c-22e89b').then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/account/activate/0acb9-45e1c-22e89b');

    spy.mockRestore();
});

test('test postAccountActivateResend with no parameters', () => {
    const p = account.postAccountActivateResend().catch(r => {
        expect(r).toBe('ERROR - postAccountActivateResend: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountActivateResend with invalid parameters', () => {
    const p = account.postAccountActivateResend({ test: 'value' }).catch(r => {
        expect(r).toBe('ERROR - postAccountActivateResend: Parameter `options` missing required property `email`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountActivateResend with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = account.postAccountActivateResend({ email: 'test' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/account/activate/resend', { body: { email: 'test' }, headers: { 'Content-Type': 'application/json' } });

    spy.mockRestore();
});

test('test postAccountRecover with no parameters', () => {
    const p = account.postAccountRecover().catch(r => {
        expect(r).toBe('ERROR - postAccountRecover: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountRecover with invalid parameters', () => {
    const p = account.postAccountRecover({ test: 'value' }).catch(r => {
        expect(r).toBe('ERROR - postAccountRecover: Parameter `options` missing required property `email`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountRecover with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = account.postAccountRecover({ email: 'test' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/account/recover', { body: { email: 'test' }, headers: { 'Content-Type': 'application/json' } });

    spy.mockRestore();
});

test('test postAccountRecoverCode with no parameters', () => {
    const p = account.postAccountRecoverCode().catch(r => {
        expect(r).toBe('ERROR - postAccountRecoverCode: Parameter `code` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountRecoverCode with blank code', () => {
    const p = account.postAccountRecoverCode('').catch(r => {
        expect(r).toBe('ERROR - postAccountRecoverCode: Parameter `code` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountRecoverCode with no options', () => {
    const p = account.postAccountRecoverCode('test').catch(r => {
        expect(r).toBe('ERROR - postAccountRecoverCode: Parameter `options` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountRecoverCode with invalid options', () => {
    const p = account.postAccountRecoverCode('test', { test: 'value' }).catch(r => {
        expect(r).toBe('ERROR - postAccountRecoverCode: Parameter `options` missing required property `newPassword`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postAccountRecoverCode with valid options', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = account.postAccountRecoverCode('test', { newPassword: 'value' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/account/recover/test', { body: { newPassword: 'value' }, headers: { 'Content-Type': 'application/json' } });
});
