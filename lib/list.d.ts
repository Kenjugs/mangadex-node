import AuthAPI from './authentication';
import CommonAPI from './common';

declare namespace ListAPI {
    /********************
     * TYPE DECLARATIONS
     ********************/

    type CustomListAttributes = {
        name: string
        visibility: 'private' | 'public'
        version: number
    };

    type CustomList = {
        /** UUID formatted string */
        id: string
        type: 'custom_list'
        attributes: CustomListAttributes
        relationships: CommonAPI.Relationship[]
    };

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    /** Response from `GET /list/{id}` */
    type GetListIdResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: CustomList
    };

    /** Request parameters for `GET /user/list` */
    type GetUserListRequestOptions = {
        /**
         * ```console
         * Default: 10
         * Minimum: 0
         * Maximum: 100
         * ```
         */
        limit?: number
        offset?: number
    };

    /** Response from `GET /user/list` */
    type GetUserListResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: CustomList[]
        limit: number
        offset: number
        total: number
    };

    /** Request parameters for `GET /user/{id}/list` */
    type GetUserIdListRequestOptions = GetUserListRequestOptions;

    /** Response from `GET /user/{id}/list` */
    type GetUserIdListResponse = GetUserListResponse;

    // Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedOrder.
    // These should be consolidated into a base type.
    type GetListIdFeedOrder = {
        createdAt: CommonAPI.Order
        updatedAt: CommonAPI.Order
        publishAt: CommonAPI.Order
        readableAt: CommonAPI.Order
        volume: CommonAPI.Order
        chapter: CommonAPI.Order
    };

    /** Request parameters for `GET /list/{id}/feed` */
    // Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedRequestOptions.
    // These should be consolidated into a base type.
    type GetListIdFeedRequestOptions = {
        /**
         * ```console
         * Default: 100
         * Minimum: 1
         * Maximum: 500
         */
        limit?: number
        offset?: number
        /** ISO 639-1 standard two or five letter language code */
        translatedLanguage?: string[]
        /** ISO 639-1 standard two or five letter language code */
        originalLanguage?: string[]
        /** ISO 639-1 standard two or five letter language code */
        excludedOriginalLanguage?: string[]
        /** Default: ["safe", "suggestive", "erotica"] */
        contentRating?: MangaAPI.MangaContentRating[]
        /** UUID formatted strings */
        excludedGroups?: string[]
        /** UUID formatted strings */
        excludedUploaders?: string[]
        includeFutureUpdates?: '0' | '1'
        /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
        createdAtSince?: string
        /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
        updatedAtSince?: string
        /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
        publishAtSince?: string
        order?: GetListIdFeedOrder
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /list/{id}/feed` */
    // Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedResponse.
    // These should be consolidated into a base type.
    type GetListIdFeedResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Chapter[]
        limit: number
        offset: number
        total: number
    };

    /**
     * Get info about a list by its ID.
     * 
     * @param {string} listId UUID formatted string
     * @returns {Promise<GetListIdResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetListIdResponse} object
     */
    function getListId(listId: string): Promise<GetListIdResponse | CommonAPI.ErrorResponse>;

    /**
     * Get the currently logged in user's custom lists (public and private).
     * 
     * @param {AuthAPI.AuthenticationToken} token See {@link AuthAPI.AuthenticationToken}
     * @param {GetUserListRequestOptions} [options] See {@link GetUserListRequestOptions}
     * @returns {Promise<GetUserListResponse>} A promise that resolves to a {@link GetUserListResponse} object
     */
    function getUserList(token: AuthAPI.AuthenticationToken, options?: GetUserListRequestOptions): Promise<GetUserListResponse>;

    /**
     * Get a specific user's custom lists (public only).
     * 
     * @param {string} id UUID formatted string
     * @param {GetUserIdListRequestOptions} [options] See {@link GetUserIdListRequestOptions}
     * @returns {Promise<GetUserIdListResponse>} A promise that resolves to a {@link GetUserIdListResponse} object
     */
    function getUserIdList(id: string, options?: GetUserIdListRequestOptions): Promise<GetUserIdListResponse>;

    /**
     * Gets a chapter feed from a specific list.
     * 
     * @param {string} id UUID formatted string
     * @param {GetListIdFeedRequestOptions} [options] See {@link GetListIdFeedRequestOptions}
     * @returns {Promise<GetListIdFeedResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetListIdFeedResponse} object
     */
    function getListIdFeed(id: string, options?: GetListIdFeedRequestOptions): Promise<GetListIdFeedResponse | CommonAPI.ErrorResponse>;
}

export = ListAPI;
