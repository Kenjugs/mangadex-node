import AuthAPI from './authentication';
import CommonAPI from './common';
import Schema from './schema';

declare namespace MangaAPI {
    /********************
     * ENUM DECLARATIONS
     ********************/

    /** Enum for manga reading status */
    enum MangaReadingStatus {
        READING,
        ON_HOLD,
        PLAN_TO_READ,
        DROPPED,
        RE_READING,
        COMPLETED,
    }

    /** Enum for manga content rating */
    enum MangaContentRating {
        SAFE,
        SUGGESTIVE,
        EROTICA,
        PORNOGRAPHIC,
    }

    /** Enum for manga publication demographic */
    enum MangaPublicationDemographic {
        SHOUNEN,
        SHOUJO,
        JOSEI,
        SEINEN,
    }

    /** Enum for manga publication status */
    enum MangaPublicationStatus {
        COMPLETED,
        ONGOING,
        CANCELLED,
        HIATUS,
    }

    /** Enum for Mangadex manga state */
    enum MangadexMangaState {
        DRAFT,
        SUBMITTED,
        PUBLISHED,
        REJECTED,
    }

    /*******************
     * TYPE DEFINITIONS
     *******************/

    type AggregateChapter = {
        chapter: string
        /** UUID formatted string */
        id: string
        /** UUID formatted strings */
        others: string[]
        /** Total number of chapters across filtered languages */
        count: number
    };

    type AggregateVolume = {
        volume: string
        /** Total number of chapters in volume across filtered languages */
        count: number
        chapters: Record<string, AggregateChapter>
    };

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    type GetSearchMangaOrder = {
        title?: CommonAPI.Order
        year?: CommonAPI.Order
        createdAt?: CommonAPI.Order
        updatedAt?: CommonAPI.Order
        latestUploadedChapter?: CommonAPI.Order
        followedCount?: CommonAPI.Order
        relevance?: CommonAPI.Order
        rating?: CommonAPI.Order
    };

    /** Request parameters for `GET /manga` */
    type GetSearchMangaRequestOptions = {
        /** Default: 10 */
        limit?: number
        offset?: number
        title?: string
        authors?: string[]
        artists?: string[]
        /** Year of release */
        year?: number
        includedTags?: string[]
        /** Default: AND */
        includedTagsMode?: 'AND' | 'OR'
        excludedTags?: string[]
        /** Default: OR */
        excludedTagsMode?: 'AND' | 'OR'
        status?: MangaPublicationStatus[]
        /** ISO 639-1 standard two or five letter language code */
        originalLanguage?: string[]
        /** ISO 639-1 standard two or five letter language code */
        excludedOriginalLanguage?: string[]
        /** ISO 639-1 standard two or five letter language code */
        availableTranslatedLanguage?: string[]
        publicationDemographic?: MangaPublicationDemographic[]
        /** Manga IDs, limited to 100 per request */
        ids?: string[]
        /** Default: ['safe', 'suggestive', 'erotica'] */
        contentRating?: MangaContentRating[]
        /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
        createdAtSince?: string
        /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
        updatedAtSince?: string
        /** Default:
         * ```
         * { latestUploadedChapter: 'desc' }
         * ``` */
        order?: GetSearchMangaOrder
        includes?: CommonAPI.Includes[]
        hasAvailableChapters?: '0' | '1' | 'true' | 'false'
        /** UUID formatted string */
        group?: string
    };

    /** Response from `GET /manga` */
    type GetSearchMangaResponse = Schema.MangaList;

    /** Response from `GET /manga/status` */
    type GetMangaStatusResponse = {
        /** Default: "ok" */
        result: string
        /**
         * Property names in `statuses` are UUID formatted strings
         * 
         * Example:
         * ```
         * {
         *     "result": "ok",
         *     "statuses": {
         *         "b019ea5d-5fe6-44d4-abbc-f546f210884d": "reading"
         *         "2394a5c7-1d2e-461f-acde-18726b9e37d6": "dropped"
         *     }
         * }
         * ```
         */
        statuses: Record<string, MangaReadingStatus>
    };

    type GetMangaIdFeedOrder = {
        createdAt?: CommonAPI.Order
        updatedAt?: CommonAPI.Order
        publishAt?: CommonAPI.Order
        readableAt?: CommonAPI.Order
        volume?: CommonAPI.Order
        chapter?: CommonAPI.Order
    };

    /** Request parameters for `GET /manga/{id}/feed` */
    type GetMangaIdFeedRequestOptions = {
        /**
         * ```console
         * Default: 100
         * Minimum: 1
         * Maximum: 500
         * ```
         */
        limit?: number
        /** Minimum: 0 */
        offset?: number
        /** ISO 639-1 standard two or five letter language code */
        translatedLanguage?: string[]
        /** ISO 639-1 standard two or five letter language code */
        originalLanguage?: string[]
        /** ISO 639-1 standard two or five letter language code */
        excludedOriginalLanguage?: string[]
        contentRating?: MangaContentRating
        /** UUID formatted strings */
        excludedGroups?: string[]
        /** UUID formatted strings */
        excludedUploaders?: string[]
        /** Default: 1 */
        includeFutureUpdates?: '0' | '1'
        /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
        createdAtSince?: string
        /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
        updatedAtSince?: string
        /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
        publishAtSince?: string
        order?: GetMangaIdFeedOrder
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /manga/{id}/feed` */
    type GetMangaIdFeedResponse = Schema.ChapterList;

    /** Request parameters for `GET /manga/{id}/aggregate` */
    type GetMangaIdAggregateRequestOptions = {
        /** ISO 639-1 standard two or five letter language code */
        translatedLanguage?: string[]
        /** UUID formatted strings */
        groups?: string[]
    };

    /** Response from `GET /manga/{id}/aggregate` */
    type GetMangaIdAggregateResponse = {
        /** Default: "ok" */
        result: string
        /** Object containing volumes and their respective chapters */
        volumes: Record<string, AggregateVolume>
    };

    /** Request parameters for `GET /manga/{id}` */
    type GetMangaIdRequestOptions = {
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /manga/{id}` */
    type GetMangaIdResponse = Schema.MangaResponse;

    /**
     * Search for manga.
     * 
     * @param {GetSearchMangaRequestOptions} [options] See {@link GetSearchMangaRequestOptions}
     * @returns {Promise<GetSearchMangaResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetSearchMangaResponse} object.
     */
    function getSearchManga(options?: GetSearchMangaRequestOptions): Promise<GetSearchMangaResponse | Schema.ErrorResponse>;

    /**
     * Get reading status of ALL manga for logged User. If `status` is given,
     * returns a filtered list with that specific reading status.
     * 
     * @param {AuthenticationToken} token See {@link AuthAPI.AuthenticationToken}
     * @param {MangaReadingStatus} [status] See {@link MangaReadingStatus}
     * @returns {Promise<GetMangaStatusResponse>} A promise that resolves to a {@link GetMangaStatusResponse} object.
     */
    function getMangaStatus(token: AuthAPI.AuthenticationToken, status?: MangaReadingStatus): Promise<GetMangaStatusResponse>;

    /**
     * Gets the feed of chapters for the given manga.
     * 
     * @param {string} mangaId
     * @param {GetMangaIdFeedRequestOptions} [options] See {@link GetMangaIdFeedRequestOptions}
     * @returns {Promise<GetMangaIdFeedResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetMangaIdFeedResponse} object
     */
    function getMangaIdFeed(mangaId: string, options?: GetMangaIdFeedRequestOptions): Promise<GetMangaIdFeedResponse | Schema.ErrorResponse>;

    /**
     * Get aggregate manga volume and chapter information.
     * 
     * @param {string} mangaId UUID formatted string
     * @param {GetMangaIdAggregateRequestOptions} [options] See {@link GetMangaIdAggregateRequestOptions}
     * @returns {Promise<GetMangaIdAggregateResponse>} A promise that resolves to a {@link GetMangaIdAggregateResponse} object
     */
    function getMangaIdAggregate(mangaId: string, options?: GetMangaIdAggregateRequestOptions): Promise<GetMangaIdAggregateResponse>;

    /**
     * Get manga information by ID.
     * 
     * @param {string} mangaId UUID formatted string
     * @param {GetMangaIdRequestOptions} [options] See {@link GetMangaIdRequestOptions}
     * @returns {Promise<GetMangaIdResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetMangaIdResponse} object
     */
    function getMangaId(mangaId: string, options?: GetMangaIdRequestOptions): Promise<GetMangaIdResponse | Schema.ErrorResponse>;
}

export = MangaAPI;
