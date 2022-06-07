const CommonAPI = require('./common');

declare namespace Utility {
    /**
     * Build a query string from a request options object
     * 
     * @param {object} [options] A request options object to parse
     * @returns {string} The query string, including the starting '?' character
     */
    declare function buildQueryStringFromOptions(options?: object): string;

    /**
     * Create an HTTPS request and return a Promise that resolves to T
     * 
     * @template T
     * @param {string} method The HTTP method
     * @param {string} path The endpoint path
     * @param {object} [options] Additional request options (such as request body, headers, etc.)
     * @returns {Promise<T | CommonAPI.ErrorResponse>} A promise that resolves to a specific response object T
     */
    declare function createHttpsRequestPromise<T>(method: string, path: string, options?: object): Promise<T | CommonAPI.ErrorResponse>;
}

export = Utility;