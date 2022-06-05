const util = require('./util');

/**
 * Send account credentials and receive an authentication token
 * 
 * @param {AuthLoginRequestOptions} login Login object containing username/email and password
 * @returns {Promise<AuthLoginResponse | ErrorResponse>} A promise that resolves to an {@link AuthLoginResponse} object
 */
exports.authLogin = function (login) {
    if (login === undefined) {
        console.error('ERROR - authLogin: Parameter `login` cannot be undefined');
        return;
    } else if (!('username' in login) && !('email' in login)) {
        console.error('ERROR - authLogin: Parameter `login` missing both `login.username` and `login.email`');
        return;
    } else if (!('password' in login)) {
        console.error('ERROR - authLogin: Parameter `login` missing required property `login.password`');
        return;
    }

    const path = '/auth/login';

    const options = {
        body: login,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return util.createHttpsRequestPromise('POST', path, options);
};

/**
 * Check if a session token is still valid
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns {Promise<GetAuthCheckResponse>} A promise that resolves to a {@link GetAuthCheckResponse} object
 */
exports.getAuthCheck = function (token) {
    if (token === undefined) {
        console.error('ERROR - getAuthCheck: Parameter `token` cannot be undefined');
        return;
    } else if (!'session' in token) {
        console.error('ERROR - getAuthCheck: Parameter `token` missing required property `session`');
        return;
    }

    const path = '/auth/check';

    const options = {
        headers: {
            Authorization: `Bearer ${token.session}`,
        },
    };

    return util.createHttpsRequestPromise('GET', path, options);
};

/**
 * Logs out of a currently valid session
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns {Promise<AuthLogoutResponse | ErrorResponse>} A promise that resolves to an {@link AuthLogoutResponse} object
 */
exports.authLogout = function (token) {
    if (token === undefined) {
        console.error('ERROR - authLogout: Parameter `token` cannot be undefined');
        return;
    } else if (!session in token) {
        console.error('ERROR - authLogout: Parameter `token` missing required property `session`');
        return;
    }

    const path = '/auth/logout';

    const options = {
        headers: {
            Authorization: `Bearer ${token.session}`,
        },
    };

    return util.createHttpsRequestPromise('POST', path, options);
};

/**
 * Refreshes a session token that has expired. Session tokens only last for 15
 * minutes; refresh tokens allow you to refresh session tokens for up to a month
 * without needing to re-authenticate. If the refresh token has expired, you
 * will need to log in again; you cannot refresh a refresh token any other way.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns {Promise<AuthRefreshResponse | ErrorResponse>} A promise that resolves to an {@link AuthRefreshResponse} object
 */
exports.authRefresh = function (token) {
    if (token === undefined) {
        console.error('ERROR - authRefresh: Parameter `token` cannot be undefined');
        return;
    } else if (!refresh in token) {
        console.error('ERROR - authRefresh: Parameter `token` missing required property `refresh`');
        return;
    }

    const path = '/auth/refresh';

    const options = {
        body: {
            token: token.refresh,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return util.createHttpsRequestPromise('POST', path, options);
};
