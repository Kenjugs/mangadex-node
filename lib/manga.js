const util = require('./util');

/********************
 * ENUM DECLARATIONS
 ********************/

/** Enum for manga reading status */
exports.MangaReadingStatus = Object.freeze({
    READING: 'reading',
    ON_HOLD: 'on_hold',
    PLAN_TO_READ: 'plan_to_read',
    DROPPED: 'dropped',
    RE_READING: 're_reading',
    COMPLETED: 'completed',
});

/** Enum for manga content rating */
exports.MangaContentRating = Object.freeze({
    SAFE: 'safe',
    SUGGESTIVE: 'suggestive',
    EROTICA: 'erotica',
    PORNOGRAPHIC: 'pornographic',
});

/** Enum for manga publication demographic */
exports.MangaPublicationDemographic = Object.freeze({
    NONE: 'none',
    SHOUNEN: 'shounen',
    SHOUJO: 'shoujo',
    JOSEI: 'josei',
    SEINEN: 'seinen',
});

/** Enum for manga publication status */
exports.MangaPublicationStatus = Object.freeze({
    COMPLETED: 'completed',
    ONGOING: 'ongoing',
    CANCELLED: 'cancelled',
    HIATUS: 'hiatus',
});

/** Enum for Mangadex manga state */
exports.MangadexMangaState = Object.freeze({
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    PUBLISHED: 'published',
    REJECTED: 'rejected',
});

/**
 * Search for manga.
 * 
 * @param {GetSearchMangaRequestOptions} [options] See {@link GetSearchMangaRequestOptions}
 * @returns {Promise<GetSearchMangaResponse | ErrorResponse>} A promise that resolves to a {@link GetSearchMangaResponse} object.
 */
exports.getSearchManga = function (options) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Get reading status of ALL manga for logged User. If `status` is given,
 * returns a filtered list with that specific reading status.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {MangaReadingStatus} [status] See {@link MangaReadingStatus}
 * @returns {Promise<GetMangaStatusResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaStatusResponse} object.
 */
exports.getMangaStatus = function (token, status) {
    const qs = util.buildQueryStringFromOptions({ status: status });
    const path = `/manga/status${qs}`;

    const httpsRequestOptions = util.addTokenAuthorization(token);

    return util.createHttpsRequestPromise('GET', path, httpsRequestOptions);
};

/**
 * Gets the feed of chapters for the given manga.
 * 
 * @param {string} id
 * @param {GetMangaIdFeedRequestOptions} [options] See {@link GetMangaIdFeedRequestOptions}
 * @returns {Promise<GetMangaIdFeedResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaIdFeedResponse} object
 */
exports.getMangaIdFeed = function (id, options) {
    if (id === undefined) {
        console.error('ERROR - getMangaIdFeed: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getMangaIdFeed: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga/${id}/feed${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Get aggregate manga volume and chapter data.
 * 
 * @param {string} id UUID formatted string
 * @param {GetMangaIdAggregateRequestOptions} [options] See {@link GetMangaIdAggregateRequestOptions}
 * @returns {Promise<GetMangaIdAggregateResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaIdAggregateResponse} object
 */
exports.getMangaIdAggregate = function (id, options) {
    if (id === undefined) {
        console.error('ERROR - getMangaIdAggregate: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getMangaIdAggregate: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga/${id}/aggregate${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Get manga information by ID.
 * 
 * @param {string} id UUID formatted string
 * @param {GetMangaIdRequestOptions} [options] See {@link GetMangaIdRequestOptions}
 * @returns {Promise<GetMangaIdResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaIdResponse} object
 */
exports.getMangaId = function (id, options) {
    if (id === undefined) {
        console.error('ERROR - getMangaId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getMangaId: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga/${id}${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/06/2022) TODO: Implement functionality for `PUT /manga/{id}`
var updateMangaId = function (id, options) { };

// Kenjugs (06/06/2022) TODO: Implement functionality for `DELETE /manga/{id}`
var deleteMangaId = function (id) { };

// Kenjugs (06/24/2022) TODO: Implement functionality for `DELETE /manga/{id}/follow`
var unfollowMangaId = function (id) { };

// Kenjugs (06/24/2022) TODO: Implement functionality for `POST /manga/{id}/follow`
var followMangaId = function (id) { };

/**
 * Get a list of chapters that have been marked as read for a given manga.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {string} id UUID formatted string
 * @returns {Promise<GetMangaIdReadMarkersResponse>} A promise that resolves to a {@link GetMangaIdReadMarkersResponse} object
 */
exports.getMangaIdReadMarkers = function (token, id) {
    if (id === undefined) {
        console.error('ERROR - getMangaIdReadMarkers: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getMangaIdReadMarkers: Parameter `id` cannot be blank');
        return;
    }

    const httpsRequestOptions = util.addTokenAuthorization(token);

    const path = `/manga/${id}/read`;
    return util.createHttpsRequestPromise('GET', path, httpsRequestOptions);
};

/**
 * Get a list of chapters that have been marked as read grouped by manga.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetMangaReadMarkersRequestOptions} options See {@link GetMangaReadMarkersRequestOptions}
 * @returns {Promise<GetMangaReadMarkersResponse>} A promise that resolves to a {@link GetMangaReadMarkersResponse} object
 */
exports.getMangaReadMarkers = function (token, options) {
    if (options === undefined) {
        console.error('ERROR - getMangaReadMarkers: Parameter `options` cannot be undefined');
        return;
    } else if (!('ids' in options)) {
        console.error('ERROR - getMangaReadMarkers: Parameter `options` missing required property `ids`');
        return;
    }

    const httpsRequestOptions = util.addTokenAuthorization(token);
    const qs = util.buildQueryStringFromOptions(options);

    const path = `/manga/read${qs}`;
    return util.createHttpsRequestPromise('GET', path, httpsRequestOptions);
};
