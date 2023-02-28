const util = require('../lib/util');
const captcha = require('../lib/captcha');

test('test postCaptchaSolve with no parameters', () => {
    const p = captcha.postCaptchaSolve().catch(r => {
        expect(r).toBe('ERROR - postCaptchaSolve: Parameter `challengeString` cannot be undefined');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postCaptcha with invalid challengeString', () => {
    const p = captcha.postCaptchaSolve('').catch(r => {
        expect(r).toBe('ERROR - postCaptchaSolve: Parameter `challengeString` cannot be blank');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postCaptcha with valid parameters', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = captcha.postCaptchaSolve('test').then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/captcha/solve', { body: { captchaChallenge: 'test' }, headers: { 'Content-Type': 'application/json' } });

    spy.mockRestore();
});

test('test postCaptcha with valid parameters - include invalid token', () => {
    const p = captcha.postCaptchaSolve('test', { }).catch(r => {
        expect(r).toBeInstanceOf(Error);
        expect(r.message).toBe('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
    });

    expect(p).toBeInstanceOf(Promise);
});

test('test postCaptcha with valid parameters - include valid token', () => {
    const spy = jest.spyOn(util, 'createHttpsRequestPromise').mockImplementation((m, p, o) => {
        return Promise.resolve({ result: 'ok' });
    });

    const p = captcha.postCaptchaSolve('test', { session: 'valid-session' }).then(res => {
        expect(res).toEqual({ result: 'ok' });
    });

    expect(p).toBeInstanceOf(Promise);
    expect(util.createHttpsRequestPromise).toHaveBeenCalledWith('POST', '/captcha/solve', { body: { captchaChallenge: 'test' }, headers: { Authorization: 'Bearer valid-session', 'Content-Type': 'application/json' } });

    spy.mockRestore();
});
