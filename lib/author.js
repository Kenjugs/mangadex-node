const util = require('./util');

/**
 * Search for author based on search criteria
 * 
 * @param {GetAuthorRequestOptions} [options] See {@link GetAuthorRequestOptions}
 * @returns {Promise<GetAuthorResponse | ErrorResponse>} A promise that resolves to a {@link GetAuthorResponse} object
 */
exports.getAuthor = function(options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/author${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};
