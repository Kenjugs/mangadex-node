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
    if (token === undefined) {
        console.error('ERROR - getMangaStatus: Parameter `token` cannot be undefined');
        return;
    }

    const path = `/manga/status${status ? '?status=' + status : ''}`;

    const options = {
        headers: {
            Authorization: `Bearer ${token.session}`,
        },
    };

    return util.createHttpsRequestPromise('GET', path, options);
};

/**
 * Gets the feed of chapters for the given manga.
 * 
 * @param {string} mangaId
 * @param {GetMangaIdFeedRequestOptions} [options] See {@link GetMangaIdFeedRequestOptions}
 * @returns {Promise<GetMangaIdFeedResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaIdFeedResponse} object
 */
exports.getMangaIdFeed = function (mangaId, options) {
    if (mangaId === undefined) {
        console.error('ERROR - getMangaIdFeed: Parameter `mangaId` cannot be undefined');
        return;
    } else if (mangaId === '') {
        console.error('ERROR - getMangaIdFeed: Parameter `mangaId` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga/${mangaId}/feed${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Get manga volumes and chapters.
 * 
 * @param {string} mangaId UUID formatted string
 * @param {GetMangaIdAggregateRequestOptions} [options] See {@link GetMangaIdAggregateRequestOptions}
 * @returns {Promise<GetMangaIdAggregateResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaIdAggregateResponse} object
 */
exports.getMangaIdAggregate = function (mangaId, options) {
    if (mangaId === undefined) {
        console.error('ERROR - getMangaIdAggregate: Parameter `mangaId` cannot be undefined');
        return;
    } else if (mangaId === '') {
        console.error('ERROR - getMangaIdAggregate: Parameter `mangaId` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga/${mangaId}/aggregate${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

/**
 * Get manga information by ID.
 * 
 * @param {string} mangaId UUID formatted string
 * @param {GetMangaIdRequestOptions} [options] See {@link GetMangaIdRequestOptions}
 * @returns {Promise<GetMangaIdResponse | ErrorResponse>} A promise that resolves to a {@link GetMangaIdResponse} object
 */
exports.getMangaId = function (mangaId, options) {
    if (mangaId === undefined) {
        console.error('ERROR - getMangaId: Parameter `mangaId` cannot be undefined');
        return;
    } else if (mangaId === '') {
        console.error('ERROR - getMangaId: Parameter `mangaId` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/manga/${mangaId}${qs}`;

    return util.createHttpsRequestPromise('GET', path);
};

// Kenjugs (06/06/2022) TODO: Implement functionality for `PUT /manga/{id}`
updateMangaId = function (mangaId, options) { };

// Kenjugs (06/06/2022) TODO: Implement functionality for `DELETE /manga/{id}`
deleteMangaId = function (mangaId) { };
