import CommonAPI from './common';
import MangaAPI from './manga';
import Schema from './schema';

declare namespace ChapterAPI {
    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    type GetChaptersOrder = {
        createdAt?: CommonAPI.Order
        updatedAt?: CommonAPI.Order
        publishAt?: CommonAPI.Order
        readableAt?: CommonAPI.Order
        volume?: CommonAPI.Order
        chapter?: CommonAPI.Order
    };

    /** Request parameters for `GET /chapter` */
    type GetChaptersRequestOptions = {
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
        contentRating?: MangaAPI.MangaContentRating[]
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
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /chapter` */
    type GetChaptersResponse = Schema.ChapterList;

    /** Request parameters for `GET /chapter/{id}` */
    type GetChapterIdRequestOptions = {
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /chapter/{id}` */
    type GetChapterIdResponse = Schema.ChapterResponse;

    /**
     * Gets a list of chapters based on search options.
     * 
     * @param {GetChaptersRequestOptions} [options] See {@link GetChaptersRequestOptions}
     * @returns {Promise<GetChaptersResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetChaptersResponse} object
     */
    function getChapters(options?: GetChaptersRequestOptions): Promise<GetChaptersResponse | Schema.ErrorResponse>;

    /**
     * Gets information about a specific chapter.
     * 
     * @param {string} id UUID formatted string
     * @param {GetChapterIdRequestOptions} [options] See {@link GetChapterIdRequestOptions}
     * @returns {Promise<GetChapterIdResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetChapterIdResponse} object
     */
    function getChapterId(id: string, options?: GetChapterIdRequestOptions): Promise<GetChapterIdResponse | Schema.ErrorResponse>;
}

export = ChapterAPI;
