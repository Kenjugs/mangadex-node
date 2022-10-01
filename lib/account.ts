/********************
 * IMPORT STATEMENTS
 ********************/

import { ErrorResponse } from './schema';
import * as util from './util';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `GET /account/available` */
export type GetAccountAvailableResponse = {
    available: boolean
};

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Check if an account username is available for account creation.
 * 
 * @param {string} username Username to check availability of
 * @returns A promise that resolves to a {@link GetAccountAvailableResponse} object.
 * Will resolve to a {@link ErrorResponse} object.
 */
export const getAccountAvailable = function (username: string) {
    if (username === undefined) {
        return Promise.reject('ERROR - getAccountAvailable: Parameter `username` cannot be undefined');
    } else if (username === '') {
        return Promise.reject('ERROR - getAccountAvailable: Parameter `username` cannot be empty');
    }

    const qs = util.buildQueryStringFromOptions({ username: username });
    const path = `/account/available${qs}`;

    return util.createHttpsRequestPromise<GetAccountAvailableResponse>('GET', path);
};

// Kenjugs (06/06/2022) TODO: Implement functionality for `POST /account/create`
// export const accountCreate = function (options: unknown) { };

// Kenjugs (06/06/2022) TODO: Implement functionality for `POST /account/activate/{code}`
// export const accountActivateCode = function (code: unknown) { };
