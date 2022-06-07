const util = require('./util');

/**
 * Search for a scanlation group
 * 
 * @param {GetSearchGroupRequestOptions} [options] See {@link GetSearchGroupRequestOptions}
 * @returns {Promise<GetSearchGroupResponse | ErrorResponse>} A promise that resolves to a {@link GetSearchGroupResponse} object
 */
exports.getSearchGroup = function (options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/group${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/** Kenjugs (06/06/2022) TODO: Implement functionality for `POST /group` */
var createGroup = function (token, options) { };

/**
 * Get info about a specific scanlation group by their ID
 * 
 * @param {string} groupId UUID formatted string
 * @param {GetGroupIdRequestOptions} [options] See {@link GetGroupIdRequestOptions}
 * @returns {Promise<GetGroupIdResponse | ErrorResponse>} A promise that resolves to a {@link GetGroupIdResponse} object
 */
exports.getGroupId = function (groupId, options) {
    if (groupId === undefined) {
        console.error('ERROR - getGroupId: Parameter `groupId` cannot be undefined');
        return;
    } else if (groupId === '') {
        console.error('ERROR - getGroupId: Parameter `groupId` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/group/${groupId}${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/07/2022) TODO: Implement functionality for `PUT /group/{id}`
var updateGroupId = function (token, groupId, options) { };

// Kenjugs (06/07/2022) TODO: Implement functionality for `DELETE /group/{id}`
var deleteGroupId = function (token, groupId) { };

// Kenjugs (06/07/2022) TODO: Implement functionality for `POST /group/{id}/follow`
var followGroupId = function (token, groupId) { };

// Kenjugs (06/07/2022) TODO: Implement functionality for `DELETE /group/{id}/follow`
var unfollowGroupId = function (token, groupId) { };
