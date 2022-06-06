const util = require('./util');

/**
 * Check if an account username is available for account creation.
 * 
 * @param {string} username Username to check availability of
 * @returns {Promise<>} A promise that resolves to an {@link } object
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
