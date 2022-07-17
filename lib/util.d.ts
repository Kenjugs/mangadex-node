import * as https from 'https';
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
}

export = Utility;
