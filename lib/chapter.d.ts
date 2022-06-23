import CommonAPI from './common';
import MangaAPI from './manga';

declare namespace ChapterAPI {
    /*******************
     * TYPE DEFINITIONS
     *******************/

    type ChapterAttributes = {
        title: string
        volume?: string
        chapter?: string
        pages: number
        translatedLanguage: string
        /** UUID formatted string */
        uploader: string
        /** Denotes a chapter that links to an external source */
        externalUrl: string
        version: number
        createdAt: string
        updatedAt: string
        publishAt: string
        readableAt: string
    };

    type Chapter = {
        /** UUID formatted string */
        id: string
        type: 'chapter'
        attributes: ChapterAttributes
        relationships: CommonAPI.Relationship[]
    };

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
        includes?: string[]
    };

    /** Response from `GET /chapter` */
    // Kenjugs (06/22/2022) TODO: This type should be consolidated with MangaAPI.GetMangaIdFeedResponse
    // since both refer to the same schema "ChapterList" (i.e.: having a base schema that both can extend from)
    type GetChaptersResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Chapter[]
        limit: number
        offset: number
        total: number
    };

    /** Request parameters for `GET /chapter/{id}` */
    type GetChapterIdRequestOptions = {
        includes?: string[]
    };

    /** Response from `GET /chapter/{id}` */
    type GetChapterIdResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: Chapter
    };

    /**
     * Gets a list of chapters based on search options.
     * 
     * @param {GetChaptersRequestOptions} [options] See {@link GetChaptersRequestOptions}
     * @returns {Promise<GetChaptersResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetChaptersResponse} object
     */
    function getChapters(options?: GetChaptersRequestOptions): Promise<GetChaptersResponse | CommonAPI.ErrorResponse>;

    /**
     * Gets information about a specific chapter.
     * 
     * @param {string} id UUID formatted string
     * @param {GetChapterIdRequestOptions} [options] See {@link GetChapterIdRequestOptions}
     * @returns {Promise<GetChapterIdResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetChapterIdResponse} object
     */
    function getChapterId(id: string, options?: GetChapterIdRequestOptions): Promise<GetChapterIdResponse | CommonAPI.ErrorResponse>;
}

export = ChapterAPI;
