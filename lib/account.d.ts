import Schema from './schema';

declare namespace AccountAPI {
    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    /** Response from `GET /account/available` */
    type GetAccountAvailableResponse = {
        available: boolean
    };

    /**
     * Check if an account username is available for account creation.
     * 
     * @param {string} username Username to check availability of
     * @returns {Promise<GetAccountAvailableResponse | Schema.ErrorResponse>} A promise that resolves to an {@link GetAccountAvailableResponse} object
     */
    function getAccountAvailable(username: string): Promise<GetAccountAvailableResponse | Schema.ErrorResponse>;
}

export = AccountAPI;
