const util = require('./util');

/**
 * Search for manga covers based on some search criteria.
 * 
 * @param {GetCoverRequestOptions} [options] See {@link GetCoverRequestOptions}
 * @returns {Promise<GetCoverResponse | ErrorResponse>} A promise that resolves to a {@link GetCoverResponse} object
 */
exports.getCover = function(options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/cover${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Get manga cover by ID
 * 
 * @param {string} id UUID formatted string.
 * @param {GetCoverIdRequestOptions} [options] See {@link GetCoverIdRequestOptions}
 * @returns {Promise<GetCoverIdResponse | ErrorResponse>} A promise that resolves to a {@link GetCoverIdResponse} object
 */
exports.getCoverId = function(id, options) {
    if (id === undefined) {
        console.error('ERROR - getCoverId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getCoverId: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/cover/${id}${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};
