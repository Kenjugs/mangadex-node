import CommonAPI from './common';

declare namespace GroupAPI {
    /********************
     * TYPE DECLARATIONS
     ********************/

    declare type ScanlationGroupAttributes = {
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

    declare type ScanlationGroup = {
        /** UUID formatted string */
        id: string
        type: 'scanlation_group'
        attributes: ScanlationGroupAttributes
        relationships: CommonAPI.Relationship[]
    };

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    declare type GetSearchGroupOrder = {
        name?: CommonAPI.Order
        createdAt?: CommonAPI.Order
        updatedAt?: CommonAPI.Order
        followedCount?: CommonAPI.Order
        relevance?: CommonAPI.Order
    };

    /** Request parameters for `GET /group` */
    declare type GetSearchGroupRequestOptions = {
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
        includes?: string[]
        /**
         * Default: { latestUploadedChapter: 'desc' }
         * 
         * Seems to be a typo? Comes directly from their documentation.
         */
        order?: GetSearchGroupOrder
    };

    /** Response from `GET /group` */
    declare type GetSearchGroupResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: ScanlationGroup[]
        limit: number
        offset: number
        total: number
    };

    /**
     * Search for a scanlation group
     * 
     * @param {GetSearchGroupRequestOptions} options See {@link GetSearchGroupRequestOptions}
     * @returns {Promise<GetSearchGroupResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetSearchGroupResponse} object
     */
    declare function getSearchGroup(options: GetSearchGroupRequestOptions): Promise<GetSearchGroupResponse | CommonAPI.ErrorResponse>;
}

export = GroupAPI;
