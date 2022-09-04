/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from './authentication';
import { ScanlationGroupList } from './schema';
import { Includes } from './static';
import * as util from './util';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /user/follows/group` */
export type GetUserFollowsGroupRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 1
     * Maximum: 100
     * ``` */
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
    includes?: Includes[]
};

/** Response from `GET /user/follows/group` */
export type GetUserFollowsGroupResponse = ScanlationGroupList;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Get logged in user's followed groups.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @param {GetUserFollowsGroupRequestOptions} [options] See {@link GetUserFollowsGroupRequestOptions}
 * @returns A promise that resolves to a {@link GetUserFollowsGroupResponse} object
 */
export const getUserFollowsGroup = function (token: AuthenticationToken, options?: GetUserFollowsGroupRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/user/follows/group${qs}`;
    const httpsRequestOptions = util.addTokenAuthorization(token);

    if (!httpsRequestOptions) return;

    return util.createHttpsRequestPromise('GET', path, httpsRequestOptions);
};
