const util = require('./util');

/**
 * Check if an account username is available for account creation.
 * 
 * @param {string} username Username to check availability of
 * @returns {Promise<GetAccountAvailableResponse | ErrorResponse>} A promise that resolves to a {@link GetAccountAvailableResponse} object
 */
exports.getAccountAvailable = function (username) {
    if (username === undefined) {
        console.error('ERROR - getAccountAvailable: Parameter `username` cannot be undefined');
        return;
    } else if (username === '') {
        console.error('ERROR - getAccountAvailable: Parameter `username` cannot be empty');
        return;
    }

    const qs = util.buildQueryStringFromOptions({ username: username });
    const path = `/account/available${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/06/2022) TODO: Implement functionality for `POST /account/create`
accountCreate = function (options) { };

// Kenjugs (06/06/2022) TODO: Implement functionality for `POST /account/activate/{code}`
accountActivateCode = function (code) { };
