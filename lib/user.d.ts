import AuthAPI from './authentication';
import CommonAPI from './common';

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

    /**
     * Get a list of users based on search parameters
     * 
     * @param {AuthAPI.AuthenticationToken} token See {@link AuthAPI.AuthenticationToken}
     * @param {GetUsersRequestOptions} [options] See {@link GetUsersRequestOptions}
     * @returns {Promise<GetUsersResponse>} A promise that resolves to a {@link GetUsersResponse} object
     */
    function getUsers(token: AuthAPI.AuthenticationToken, options?: GetUsersRequestOptions): Promise<GetUsersResponse>;

    /**
     * Get a specific user's information
     * 
     * @param {string} id UUID formatted string
     * @returns {Promise<GetUserIdResponse>} A promise that resolves to a {@link GetUserIdResponse} object
     */
    function getUserId(id: string): Promise<GetUserIdResponse>;
}

export = UserAPI;
