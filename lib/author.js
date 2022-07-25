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

/**
 * Get author info by ID
 * 
 * @param {string} id UUID formatted string
 * @param {GetAuthorIdRequestOptions} [options] See {@link GetAuthorIdRequestOptions}
 * @returns {Promise<GetAuthorIdResponse | ErrorResponse>} A promise that resolves to a {@link GetAuthorIdResponse} object
 */
exports.getAuthorId = function(id, options) {
    if (id === undefined) {
        console.error('ERROR - getAuthorId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getAuthorId: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/author/${id}${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};
