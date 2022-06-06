import CommonAPI from './common';

declare namespace AccountAPI {
    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    /** Response from `GET /account/available` */
    declare type GetAccountAvailableResponse = {
        available: boolean
    };

    /**
     * Check if an account username is available for account creation.
     * 
     * @param {string} username Username to check availability of
     * @returns {Promise<GetAccountAvailableResponse | CommonAPI.ErrorResponse>} A promise that resolves to an {@link GetAccountAvailableResponse} object
     */
    declare function getAccountAvailable(username: string): Promise<GetAccountAvailableResponse | CommonAPI.ErrorResponse>;
}

export = AccountAPI;
