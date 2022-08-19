/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from './authentication';
import https from 'https';
import { ErrorResponse } from './schema';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** HTTPS request options with an optional body property */
export type RequestOptions = https.RequestOptions & {
    body?: object
};

/************************
 * CONSTANT DECLARATIONS
 ************************/

const HOSTNAME = 'api.mangadex.org';

/************************
* FUNCTION DECLARATIONS
************************/

/**
 * Transform an array of strings to query string params of the form
 * `name[]=value1&name[]=value2` etc
 * 
 * @param {string} name
 * @param {string[]} [array]
 * @returns {string} Formatted query string params
 */
const transformArrayForQueryString = function (name: string, array?: string[]) {
    let qs = '';

    if (array === undefined || array.length === 0) {
        return qs;
    }

    for (const s of array) {
        if (qs === '') {
            qs += `${name}[]=${s}`;
        } else {
            qs += `&${name}[]=${s}`;
        }
    }

    return qs;
};

/**
 * Build a query string from a request options object.
 * 
 * @param {object} [options] A request options object to parse
 * @returns {string} The query string, including the starting '?' character
 */
export const buildQueryStringFromOptions = function (options?: { [key: string]: any }) {
    const queryParams = [];

    if (options === undefined || Object.keys(options).length === 0) {
        return '';
    }

    for (const key of Object.keys(options)) {
        if (options[key] instanceof Array) {
            queryParams.push(transformArrayForQueryString(key, options[key]));
        } else if (options[key] instanceof Date) {
            if (!isNaN(options[key])) {
                /** @type {Date} */
                const d = options[key];
                queryParams.push(`${key}=${d.toISOString().substring(0, d.toISOString().indexOf('.'))}`);
            }
        } else if (key === 'order') {
            const order = options[key];

            for (const o of Object.keys(order)) {
                queryParams.push(`order[${o}]=${order[o]}`);
            }
        } else {
            queryParams.push(`${key}=${options[key]}`);
        }
    }

    const ret = `?${queryParams.join('&')}`;
    return ret === '?' ? '' : ret;
};

/**
 * @template T
 * @param {string} method The HTTP method.
 * @param {string} path The endpoint path.
 * @param {RequestOptions} [options] Additional request options (such as request body, headers, etc.)
 * @returns A promise that resolves to a specific response object T.
 */
export const createHttpsRequestPromise = function <T>(method: string, path: string, options?: RequestOptions) {
    if (method === undefined) {
        console.error('ERROR - createHttpsRequestPromise: Parameter `method` cannot be undefined');
        return;
    } else if (method === '') {
        console.error('ERROR - createHttpsRequestPromise: Parameter `method` cannot be blank');
        return;
    } else if (path === undefined) {
        console.error('ERROR - createHttpsRequestPromise: Parameter `path` cannot be undefined');
        return;
    } else if (path === '') {
        console.error('ERROR - createHttpsRequestPromise: Parameter `path` cannot be blank');
        return;
    }

    const httpsRequestOptions = {
        method: method,
        path: path,
        hostname: HOSTNAME,
    };

    // extract request body if we have one
    let body: object | undefined | null = null;

    if (options && ('body' in options)) {
        body = options.body;
        delete options.body;
    }

    // merge the options object if it was provided
    if (options) {
        Object.assign(httpsRequestOptions, options);
    }

    return new Promise<T | ErrorResponse>((resolve, reject) => {
        const req = https.request(httpsRequestOptions, res => {
            const chunks: Buffer[] = [];

            res.on('data', chunk => {
                chunks.push(Buffer.from(chunk));
            });

            res.on('error', err => {
                reject(err);
            });

            res.on('end', () => {
                const s = Buffer.concat(chunks).toString('utf8');

                if (['{', '['].includes(s.charAt(0))) {
                    resolve(JSON.parse(s));
                }
            });
        });

        if (body !== null) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
};

/**
 * Adds an authorization header to a request options object.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {RequestOptions} [request] RequestOptions object to add the token to
 * @returns A new {@link RequestOptions} object with the added authorization token
 */
export const addTokenAuthorization = function (token: AuthenticationToken, request?: RequestOptions) {
    if (token === undefined) {
        console.error('ERROR - addTokenAuthorization: Parameter `token` cannot be undefined');
        return;
    } else if (!('session' in token)) {
        console.error('ERROR - addTokenAuthorization: Parameter `token` missing required property `session`');
        return;
    }

    const o = Object.assign({
        headers: {
            Authorization: `Bearer ${token.session}`,
        },
    }, request ? request : {});

    return o;
};