const util = require('./util');

/**
 * Send account credentials and receive an authentication token
 * 
 * @param {Login} login Login object containing username/email and password
 * @returns {Promise<AuthLoginResponse | ErrorResponse>} A promise that resolves to an {@link AuthLoginResponse} object
 */
exports.authLogin = function (login) {
    if (login === undefined) {
        console.error('ERROR - postAuthLogin: Parameter `login` cannot be undefined');
        return;
    } else if (!('username' in login) && !('email' in login)) {
        console.error('ERROR - postAuthLogin: Parameter `login` missing both `login.username` and `login.email`');
        return;
    } else if (!('password' in login)) {
        console.error('ERROR - postAuthLogin: Parameter `login` missing required property `login.password`');
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
