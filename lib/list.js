const util = require('./util');

// Kenjugs (06/07/2022) TODO: Implement functionality for `POST /list`
var createList = function () { };

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
