import CommonAPI from './common';
import Schema from './schema';

declare namespace CoverAPI {
    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    type GetCoverOrder = {
        createdAt: CommonAPI.Order
        updatedAt: CommonAPI.Order
        volume: CommonAPI.Order
    };
    
    /** Request parameters for `GET /cover` */
    type GetCoverRequestOptions = {
        /** ```console
         * Default: 10
         * Minimum: 0
         * Maximum: 100
         * ``` */
        limit?: number
        /** ```console
         * Minimum: 0
         * ``` */
        offset?: number
        /**
         * UUID formatted strings
         * 
         * Limit of 100 per request
         */
        manga?: string[]
        /**
         * UUID formatted strings
         * 
         * Limit of 100 per request
         */
        ids?: string[]
        /**
         * UUID formatted strings
         * 
         * Limit of 100 per request
         */
        uploaders?: string[]
        /**
         * Pattern: ^[a-z]{2}(-[a-z]{2})?$
         * 
         * Limit of 100 per request
         */
        locales?: string[]
        order?: GetCoverOrder
        includes?: string[]
    };

    /** Response from `GET /cover` */
    type GetCoverResponse = Schema.CoverList;

    /**
     * Search for manga covers based on some search criteria.
     * 
     * @param {GetCoverRequestOptions} options See {@link GetCoverRequestOptions}
     * @returns {GetCoverResponse | Schema.ErrorResponse} A promise that resolves to a {@link GetCoverResponse} object
     */
    function getCover(options: GetCoverRequestOptions): Promise<GetCoverResponse | Schema.ErrorResponse>;
}

export = CoverAPI;
