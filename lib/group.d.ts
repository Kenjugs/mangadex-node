import CommonAPI from './common';

declare namespace GroupAPI {
    /********************
     * TYPE DECLARATIONS
     ********************/

    type ScanlationGroupAttributes = {
        name: string
        altNames: CommonAPI.LocalizedString[]
        website?: string
        ircServer?: string
        ircChannel?: string
        discord?: string
        contactEmail?: string
        description?: string
        twitter?: string
        mangaUpdates?: string
        /** ISO 639-1 standard two or five letter language code */
        focusedLanguage?: string[]
        locked: boolean
        official: boolean
        inactive: boolean
        /** ISO 8601 duration specification */
        publishDelay: string
        version: number
        createdAt: string
        updatedAt: string
    };

    type ScanlationGroup = {
        /** UUID formatted string */
        id: string
        type: 'scanlation_group'
        attributes: ScanlationGroupAttributes
        relationships: CommonAPI.Relationship[]
    };

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
    type GetSearchGroupResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: ScanlationGroup[]
        limit: number
        offset: number
        total: number
    };

    /** Request parameters for `GET /group/{id}` */
    type GetGroupIdRequestOptions = {
        includes?: CommonAPI.Includes[]
    };

    /** Response from `GET /group/{id}` */
    type GetGroupIdResponse = {
        result: 'ok'
        /** Default: "entity" */
        response: string
        data: ScanlationGroup
    };

    /**
     * Search for a scanlation group.
     * 
     * @param {GetSearchGroupRequestOptions} [options] See {@link GetSearchGroupRequestOptions}
     * @returns {Promise<GetSearchGroupResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetSearchGroupResponse} object
     */
    function getSearchGroup(options?: GetSearchGroupRequestOptions): Promise<GetSearchGroupResponse | CommonAPI.ErrorResponse>;

    /**
     * Get info about a specific scanlation group by their ID.
     * 
     * @param {string} groupId UUID formatted string
     * @param {GetGroupIdRequestOptions} [options] See {@link GetGroupIdRequestOptions}
     * @returns {Promise<GetGroupIdResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetGroupIdResponse} object
     */
    function getGroupId(groupId: string, options?: GetGroupIdRequestOptions): Promise<GetGroupIdResponse | CommonAPI.ErrorResponse>;
}

export = GroupAPI;
