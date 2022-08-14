import * as https from 'https';
import AuthAPI from './authentication';
import Schema from './schema';

declare namespace Utility {
    type RequestOptions = https.RequestOptions & {
        body: object
    };

    /**
     * Build a query string from a request options object
     * 
     * @param {object} [options] A request options object to parse
     * @returns {string} The query string, including the starting '?' character
     */
    function buildQueryStringFromOptions(options?: object): string;

    /**
     * Create an HTTPS request and return a Promise that resolves to T
     * 
     * @template T
     * @param {string} method The HTTP method
     * @param {string} path The endpoint path
     * @param {RequestOptions} [options] Additional request options (such as request body, headers, etc.)
     * @returns {Promise<T | Schema.ErrorResponse>} A promise that resolves to a specific response object T
     */
    function createHttpsRequestPromise<T>(method: string, path: string, options?: RequestOptions): Promise<T | Schema.ErrorResponse>;

    /**
     * Adds an authorization token header to a request options object.
     * 
     * @param {AuthAPI.AuthenticationToken} token See {@link AuthAPI.AuthenticationToken}
     * @param {RequestOptions} [request] RequestOptions object to add the token to
     * @returns {RequestOptions} A new {@link RequestOptions} object with the added authorization token
     */
    function addTokenAuthorization(token: AuthAPI.AuthenticationToken, request?: RequestOptions): RequestOptions;
}

export = Utility;
