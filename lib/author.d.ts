import Schema from './schema';
import CommonAPI from './common';

declare namespace AuthorAPI {
    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    type GetAuthorOrder = {
        name?: CommonAPI.Order
    };

    /** Request parameters for `GET /author` */
    type GetAuthorRequestOptions = {
        /** ```console
         * Default: 10
         * Minimum: 0
         * Maximum: 100
         * ```*/
        limit?: number
        /** ```console
         * Minimum: 0
         * ``` */
        offset?: number
        /**
         * UUID formatted strings
         * 
         * Author IDs (limited to 100 per request)
         */
        ids?: string[]
        name?: string
        order?: GetAuthorOrder
        includes?: string[]
    };

    /** Response from `GET /author` */
    type GetAuthorResponse = Schema.AuthorList;

    /** Request parameters for `GET /author/{id}` */
    type GetAuthorIdRequestOptions = {
        includes?: string[]
    };

    /** Response from `GET /author/{id}` */
    type GetAuthorIdResponse = Schema.AuthorResponse;

    /**
     * Search for author based on search criteria
     * 
     * @param {GetAuthorRequestOptions} [options] See {@link GetAuthorRequestOptions}
     * @returns {Promise<GetAuthorResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetAuthorResponse} object
     */
    function getAuthor(options?: GetAuthorRequestOptions): Promise<GetAuthorResponse | Schema.ErrorResponse>;

    /**
     * Get author info by ID
     * 
     * @param {string} id UUID formatted string
     * @param {GetAuthorIdRequestOptions} [options] See {@link GetAuthorIdRequestOptions}
     * @returns {Promise<GetAuthorIdResponse | Schema.ErrorResponse>} A promise that resolves to a {@link GetAuthorIdResponse} object
     */
    function getAuthorId(id: string, options?: GetAuthorIdRequestOptions): Promise<GetAuthorIdResponse | Schema.ErrorResponse>;
}

export = AuthorAPI;
