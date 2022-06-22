const util = require('./util');

// Kenjugs (06/07/2022) TODO: Implement functionality for `POST /list`
var createList = function (token, options) { };

/**
 * Get info about a list by its ID
 * 
 * @param {string} listId UUID formatted string
 * @returns {Promise<GetListIdResponse | ErrorResponse>} A promise that resolves to a {@link GetListIdResponse} object
 */
exports.getListId = function (listId) {
    if (listId === undefined) {
        console.error('ERROR - getListId: Parameter `listId` cannot be undefined');
        return;
    } else if (listId === '') {
        console.error('ERROR - getListId: Parameter `listId` cannot be blank');
        return;
    }

    const path = `/list/${listId}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/15/2022) TODO: Implement functionality for `PUT /list/{id}`
var updateListId = function(token, listId, options) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `DELETE /list/{id}`
var deleteListId = function(token, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `POST /list/{id}/follow`
var followListId = function(token, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `DELETE /list/{id}/follow`
var unfollowListId = function(token, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `POST /manga/{id}/list/{listId}`
var addMangaIdToListId = function(token, mangaId, listId) { };

// Kenjugs (06/15/2022) TODO: Implement functionality for `DELETE /manga/{id}/list/{listId}`
var removeMangaIdFromListId = function(token, mangaId, listId) { };

/**
 * Get the currently logged in user's custom lists (public and private)
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserListRequestOptions} [options] See {@link GetUserListRequestOptions}
 * @returns {Promise<GetUserListResponse>} A promise that resolves to a {@link GetUserListResponse} object
 */
exports.getUserList = function(token, options) {
    if (token === undefined) {
        console.error('ERROR - getUserList: Parameter `token` cannot be undefined');
        return;
    } else if (!('session' in token)) {
        console.error('ERROR - getUserList: Parameter `token` missing required property `session`');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/list${qs}`;

    const httpsOptions = {
        headers: {
            Authorization: `Bearer ${token.session}`,
        },
    };

    return util.createHttpsRequestPromise('GET', path, httpsOptions);
};

/**
 * Get a specific user's custom lists (public only)
 * 
 * @param {string} id UUID formatted string
 * @param {GetUserIdListRequestOptions} [options] See {@link GetUserIdListRequestOptions}
 * @returns {Promise<GetUserIdListResponse>} A promise that resolves to a {@link GetUserIdListResponse} object
 */
exports.getUserIdList = function(id, options) {
    if (id === undefined) {
        console.error('ERROR - getUserIdList: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getUserIdList: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/${id}/list${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};
