const util = require('./util');

/**
 * Gets a list of chapters based on search options.
 * 
 * @param {GetChaptersRequestOptions} [options] See {@link GetChaptersRequestOptions}
 * @returns {Promise<GetChaptersResponse | ErrorResponse>} A promise that resolves to a {@link GetChaptersResponse} object
 */
exports.getChapters = function(options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/chapter${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};
