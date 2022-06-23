import AuthAPI from './authentication';
import CommonAPI from './common';
import MangaAPI from './manga';

declare namespace UserAPI {
    /*******************
     * TYPE DEFINITIONS
     *******************/

    type UserAttributes = {
        username: string
        roles: string[]
        version: number
    };

    type User = {
        /** UUID formatted string */
        id: string
        type: 'user'
        attributes: UserAttributes
        relationships: CommonAPI.Relationship[]
    };

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    type GetUsersOrder = {
        username?: CommonAPI.Order
    };

    /** Request parameters for `GET /user` */
    type GetUsersRequestOptions = {
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
        username?: string
        order?: GetUsersOrder
    };

    /** Response from `GET /user` */
    type GetUsersResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: User[]
        limit: number
        offset: number
        total: number
    };

    /** Response from `GET /user/{id}` */
    type GetUserIdResponse = {
        result: 'ok'
        /** Default: "entity" */
        response: string
        data: User
    };

    type GetUserFollowedMangaFeedOrder = {
        createdAt: CommonAPI.Order
        updatedAt: CommonAPI.Order
        publishAt: CommonAPI.Order
        readableAt: CommonAPI.Order
        volume: CommonAPI.Order
        chapter: CommonAPI.Order
    };

    /** Request parameters for `GET /user/follows/manga/feed` */
    type GetUserFollowedMangaFeedRequestOptions = {
        /**
         * ```console
         * Default: 10
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
        order?: GetUserFollowedMangaFeedOrder
        includes?: string[]
    };

    /** Response from `GET /user/follows/manga/feed` */
    // Kenjugs (06/23/2022) TODO: This shares the same schema as MangaAPI.GetMangaIdFeedResponse and
    // ChapterAPI.GetChaptersResponse, so it should be included as part of their type consolidation.
    type GetUserFollowedMangaFeedResponse = {
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
     * Get a list of users based on search parameters.
     * 
     * @param {AuthAPI.AuthenticationToken} token See {@link AuthAPI.AuthenticationToken}
     * @param {GetUsersRequestOptions} [options] See {@link GetUsersRequestOptions}
     * @returns {Promise<GetUsersResponse>} A promise that resolves to a {@link GetUsersResponse} object
     */
    function getUsers(token: AuthAPI.AuthenticationToken, options?: GetUsersRequestOptions): Promise<GetUsersResponse>;

    /**
     * Get a specific user's information.
     * 
     * @param {string} id UUID formatted string
     * @returns {Promise<GetUserIdResponse>} A promise that resolves to a {@link GetUserIdResponse} object
     */
    function getUserId(id: string): Promise<GetUserIdResponse>;

    /**
     * Gets a chapter feed from currently logged in user's list of followed manga.
     * 
     * @param {AuthAPI.AuthenticationToken} token 
     * @param {GetUserFollowedMangaFeedRequestOptions} [options] See {@link GetUserFollowedMangaFeedRequestOptions}
     * @returns {Promise<GetUserFollowedMangaFeedResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetUserFollowedMangaFeedResponse} object
     */
    function getUserFollowedMangaFeed(token: AuthAPI.AuthenticationToken, options?: GetUserFollowedMangaFeedRequestOptions): Promise<GetUserFollowedMangaFeedResponse | CommonAPI.ErrorResponse>;
}

export = UserAPI;
