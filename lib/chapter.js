const util = require('./util');

/**
 * Gets a list of chapters based on search options.
 * 
 * @param {GetChaptersRequestOptions} [options] See {@link GetChaptersRequestOptions}
 * @returns {Promise<GetChaptersResponse | ErrorResponse>} A promise that resolves to a {@link GetChaptersResponse} object
 */
exports.getChapters = function (options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/chapter${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Gets information about a specific chapter.
 * 
 * @param {string} id UUID formatted string
 * @param {GetChapterIdRequestOptions} [options] See {@link GetChapterIdRequestOptions}
 * @returns {Promise<GetChapterIdResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetChapterIdResponse} object
 */
exports.getChapterId = function (id, options) {
    if (id === undefined) {
        console.error('ERROR - getChapterId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getChapterId: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/chapter/${id}${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/23/2022) TODO: Implement functionality for `PUT /chapter/{id}`
var updateChapterId = function (token, id, options) { };

// Kenjugs (06/23/2022) TODO: Implement functionality for `DELETE /chapter/{id}`
var deleteChapterId = function (token, id, options) { };
