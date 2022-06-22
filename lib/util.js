/********************
 * IMPORT STATEMENTS
 ********************/

const https = require('https');

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
const transformArrayForQueryString = function (name, array) {
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
 * Build a query string from a request options object
 * 
 * @param {object} [options] A request options object to parse
 * @returns {string} The query string, including the starting '?' character
 */
exports.buildQueryStringFromOptions = function (options) {
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
 * @param {string} method The HTTP method
 * @param {string} path The endpoint path
 * @param {object} [options] Additional request options (such as request body, headers, etc.)
 * @returns {Promise<T | ErrorResponse>} A promise that resolves to a specific response object T
 */
exports.createHttpsRequestPromise = function (method, path, options) {
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
    let body = null;

    if (options && ('body' in options)) {
        body = options.body;
        delete options.body;
    }

    // merge the options object if it was provided
    if (options) {
        Object.assign(httpsRequestOptions, options);
    }

    /** @type {Promise<T | ErrorResponse>} */
    return new Promise((resolve, reject) => {
        const req = https.request(httpsRequestOptions, res => {
            const chunks = [];
            res.on('data', chunk => {
                chunks.push(Buffer.from(chunk));
            });
            res.on('error', err => {
                reject(err);
            });
            res.on('end', () => {
                const s = Buffer.concat(chunks).toString('utf8');
                if (['{', '['].includes(s.charAt(0))) {
                    resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
                } else {
                    resolve(Buffer.concat(chunks).toString('utf8'));
                }
            });
        });

        if (body !== null) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
};
