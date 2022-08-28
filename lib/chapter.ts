/********************
 * IMPORT STATEMENTS
 ********************/

import { MangaContentRating } from './manga';
import { ChapterList, ChapterResponse, ErrorResponse } from './schema';
import { Order, Includes } from './static';
import * as util from './util';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetChaptersRequestOptions */
export type GetChaptersOrder = {
    createdAt?: Order
    updatedAt?: Order
    publishAt?: Order
    readableAt?: Order
    volume?: Order
    chapter?: Order
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /chapter` */
export type GetChaptersRequestOptions = {
    /**
     * ```console
     * Default: 10
     * Minimum: 0
     * Maximum: 100
     * ```
     */
    limit?: number
    offset?: number
    /** UUID formatted strings (limited to 100 per request) */
    ids?: string[]
    title?: string
    /** UUID formatted strings */
    groups?: string[]
    /** UUID formatted string(s) */
    uploader?: string | string[]
    /** UUID formatted string */
    manga?: string
    volume?: string | string[]
    chapter?: string | string[]
    /** ISO 639-1 standard two or five letter language code */
    translatedLanguage?: string[]
    /** ISO 639-1 standard two or five letter language code */
    originalLanguage?: string[]
    /** ISO 639-1 standard two or five letter language code */
    excludedOriginalLanguage?: string[]
    contentRating?: MangaContentRating[]
    /** UUID formatted string */
    excludedGroups?: string[]
    /** UUID formatted string */
    excludedUploaders?: string[]
    /** Default: '1' */
    includeFutureUpdates?: '0' | '1'
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    createdAtSince?: string
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    updatedAtSince?: string
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    publishAtSince?: string
    order?: GetChaptersOrder
    includes?: Includes[]
};

/** Response from `GET /chapter` */
export type GetChaptersResponse = ChapterList;

/** Request parameters for `GET /chapter/{id}` */
export type GetChapterIdRequestOptions = {
    includes?: Includes[]
};

/** Response from `GET /chapter/{id}` */
export type GetChapterIdResponse = ChapterResponse;

/** Request parameters for `GET /at-home/server/{chapterId}` */
export type GetAtHomeServerChapterIdRequestOptions = {
    /**
     * Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
     * 
     * While the conventional port for HTTPS traffic is 443 and servers are encouraged to
     * use it, it is not a hard requirement as it technically isn't anything special.
     * 
     * However, some misbehaving school/office network will at time block traffic to
     * non-standard ports, and setting this flag to `true` will ensure selection of a
     * server that uses these.
     */
    forcePort443?: boolean
};

/** Response from `GET /at-home/server/{chapterId}` */
export type GetAtHomeServerChapterIdResponse = {
    /** Default: "ok" */
    result: string
    /**
     * The base URL to construct final image URLs from.
     * 
     * The URL returned is valid for the requested chapter only, and for a duration of
     * 15 minutes from the time of the response.
     */
    baseUrl: string
    chapter: {
        hash: string
        data: string[]
        dataSaver: string[]
    }
};

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Gets a list of chapters based on search options.
 * 
 * @param {GetChaptersRequestOptions} [options] See {@link GetChaptersRequestOptions}
 * @returns A promise that resolves to a {@link GetChaptersResponse} object.
 * Will return a {@link ErrorResponse} object on error.
 */
export const getChapters = function (options?: GetChaptersRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/chapter${qs}`;

    return util.createHttpsRequestPromise<GetChaptersResponse>('GET', path);
};

/**
 * Gets information about a specific 
 * 
 * @param {string} id UUID formatted string
 * @param {GetChapterIdRequestOptions} [options] See {@link GetChapterIdRequestOptions}
 * @returns A promise that resolves to a {@link GetChapterIdResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getChapterId = function (id: string, options?: GetChapterIdRequestOptions) {
    if (id === undefined) {
        console.error('ERROR - getChapterId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getChapterId: Parameter `id` cannot be blank');
        return;
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/chapter/${id}${qs}`;

    return util.createHttpsRequestPromise<GetChapterIdResponse>('GET', path);
};

// Kenjugs (06/23/2022) TODO: Implement functionality for `PUT /chapter/{id}`
// export const updateChapterId = function (token, id, options) { };

// Kenjugs (06/23/2022) TODO: Implement functionality for `DELETE /chapter/{id}`
// export const deleteChapterId = function (token, id, options) { };

/**
 * Get MangaDex@Home server URL.
 * 
 * @param {string} chapterId UUID formatted string
 * @param {GetAtHomeServerChapterIdRequestOptions} [options] See {@link GetAtHomeServerChapterIdRequestOptions}
 * @returns A promise that resolves to a {@link GetAtHomeServerChapterIdResponse} object
 */
export const getAtHomeServerChapterId = function (chapterId: string, options?: GetAtHomeServerChapterIdRequestOptions) {
    if (chapterId === undefined) {
        console.error('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be undefined');
        return;
    } else if (chapterId === '') {
        console.error('ERROR - getAtHomeServerChapterId: Parameter `chapterId` cannot be blank');
        return;
    }
    
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/at-home/server/${chapterId}${qs}`;

    return util.createHttpsRequestPromise<GetAtHomeServerChapterIdResponse>('GET', path);
};
