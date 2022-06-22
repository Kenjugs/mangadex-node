import AuthAPI from './authentication';
import CommonAPI from './common';

declare namespace ListAPI {
    /********************
     * TYPE DECLARATIONS
     ********************/

    declare type CustomListAttributes = {
        name: string
        visibility: 'private' | 'public'
        version: number
    };

    declare type CustomList = {
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
    declare type GetListIdResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: CustomList
    };

    /** Request parameters for `GET /user/list` */
    declare type GetUserListRequestOptions = {
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
    declare type GetUserListResponse = {
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
    declare type GetUserIdListRequestOptions = GetUserListRequestOptions;

    /** Response from `GET /user/{id}/list` */
    declare type GetUserIdListResponse = GetUserListResponse;

    /**
     * Get info about a list by its ID
     * 
     * @param {string} listId UUID formatted string
     * @returns {Promise<GetListIdResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetListIdResponse} object
     */
    declare function getListId(listId: string): Promise<GetListIdResponse | CommonAPI.ErrorResponse>;

    /**
     * Get the currently logged in user's custom lists (public and private)
     * 
     * @param {AuthAPI.AuthenticationToken} token See {@link AuthAPI.AuthenticationToken}
     * @param {GetUserListRequestOptions} [options] See {@link GetUserListRequestOptions}
     * @returns {Promise<GetUserListResponse>} A promise that resolves to a {@link GetUserListResponse} object
     */
    declare function getUserList(token: AuthAPI.AuthenticationToken, options?: GetUserListRequestOptions): Promise<GetUserListResponse>;

    /**
     * Get a specific user's custom lists (public only)
     * 
     * @param {string} id UUID formatted string
     * @param {GetUserIdListRequestOptions} [options] See {@link GetUserIdListRequestOptions}
     * @returns {Promise<GetUserIdListResponse>} A promise that resolves to a {@link GetUserIdListResponse} object
     */
    declare function getUserIdList(id: string, options?: GetUserIdListRequestOptions): Promise<GetUserIdListResponse>;
};

export = ListAPI;
