const util = require('./util');

/**
 * Search for a scanlation group
 * 
 * @param {GetSearchGroupRequestOptions} options See {@link GetSearchGroupRequestOptions}
 * @returns {Promise<GetSearchGroupResponse | ErrorResponse>} A promise that resolves to a {@link GetSearchGroupResponse} object
 */
exports.getSearchGroup = function (options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/group${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/** Kenjugs (06/06/2022) TODO: Implement functionality for `POST /group` */
var createGroup = function (options) { };
