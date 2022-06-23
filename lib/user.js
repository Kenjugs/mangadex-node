const util = require('./util');

/**
 * Get a list of users based on search parameters
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUsersRequestOptions} [options] See {@link GetUsersRequestOptions}
 * @returns {Promise<GetUsersResponse>} A promise that resolves to a {@link GetUsersResponse} object
 */
exports.getUsers = function (token, options) {
    if (token === undefined) {
        console.error('ERROR - getUsers: Parameter `token` cannot be undefined');
        return;
    } else if (!('session' in token)) {
        console.error('ERROR - getUsers: Parameter `token` missing required property `session`');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user${qs}`;

    const httpsRequestOptions = {
        headers: {
            Authorization: `Bearer ${token.session}`,
        },
    };

    return util.createHttpsRequestPromise('GET', path, httpsRequestOptions);
};

/**
 * Get a specific user's information
 * 
 * @param {string} id UUID formatted string
 * @returns {Promise<GetUserIdResponse>} A promise that resolves to a {@link GetUserIdResponse} object
 */
exports.getUserId = function (id) {
    if (id === undefined) {
        console.error('ERROR - getUserId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getUserId: Parameter `id` cannot be blank');
        return;
    }

    const path = `/user/${id}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/22/2022) TODO: Implement functionality for `DELETE /user/{id}`
var deleteUserId = function(id) { };
