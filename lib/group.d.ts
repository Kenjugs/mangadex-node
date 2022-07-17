import CommonAPI from './common';
import Schema from './schema';

declare namespace GroupAPI {
    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    type GetSearchGroupOrder = {
        name?: CommonAPI.Order
        createdAt?: CommonAPI.Order
        updatedAt?: CommonAPI.Order
        followedCount?: CommonAPI.Order
        relevance?: CommonAPI.Order
    };

    /** Request parameters for `GET /group` */
    type GetSearchGroupRequestOptions = {
        /**
         * ```console
         * Default: 10
         * Minimum: 0
         * Maximum: 100
         */
        limit?: number
        offset?: number
        /**
         * UUID formatted strings for individual scanlation groups
         */
        ids?: string[]
        name?: string
        focusedLanguage?: string
        includes?: CommonAPI.Includes[]
        /**
         * Default: { latestUploadedChapter: 'desc' }
         * 
         * Seems to be a typo? Comes directly from their documentation.
         */
        order?: GetSearchGroupOrder
    };

    /** Response from `GET /group` */
    type GetSearchGroupResponse = Schema.ScanlationGroupList;

    /** Request parameters for `GET /group/{id}` */
    type GetGroupIdRequestOptions = {
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /group/{id}` */
    type GetGroupIdResponse = Schema.ScanlationGroupResponse;

    /**
     * Search for a scanlation group.
     * 
     * @param {GetSearchGroupRequestOptions} [options] See {@link GetSearchGroupRequestOptions}
     * @returns {Promise<GetSearchGroupResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetSearchGroupResponse} object
     */
    function getSearchGroup(options?: GetSearchGroupRequestOptions): Promise<GetSearchGroupResponse | Schema.ErrorResponse>;

    /**
     * Get info about a specific scanlation group by their ID.
     * 
     * @param {string} groupId UUID formatted string
     * @param {GetGroupIdRequestOptions} [options] See {@link GetGroupIdRequestOptions}
     * @returns {Promise<GetGroupIdResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetGroupIdResponse} object
     */
    function getGroupId(groupId: string, options?: GetGroupIdRequestOptions): Promise<GetGroupIdResponse | Schema.ErrorResponse>;
}

export = GroupAPI;
