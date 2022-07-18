const util = require('./util');

/**
 * Search for manga covers based on some search criteria.
 * 
 * @param {GetCoverRequestOptions} [options] See {@link GetCoverRequestOptions}
 * @returns {GetCoverResponse | ErrorResponse} A promise that resolves to a {@link GetCoverResponse} object
 */
exports.getCover = function(options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/cover${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};
