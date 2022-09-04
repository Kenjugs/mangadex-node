/********************
 * IMPORT STATEMENTS
 ********************/

import { AuthenticationToken } from './authentication';
import { ScanlationGroupList, Response } from './schema';
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

/** Response from `GET /user/follows/group/{id}` */
export type GetUserFollowsGroupIdResponse = Response;

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

    return util.createHttpsRequestPromise<GetUserFollowsGroupResponse>('GET', path, httpsRequestOptions);
};

/**
 * Check if logged user follows a group.
 * 
 * @param {string} id UUID formatted string
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link GetUserFollowsGroupIdResponse} object
 */
export const getUserFollowsGroupId = function (id: string, token: AuthenticationToken) {
    if (id === undefined) {
        console.error('ERROR - getUserFollowsGroupId: Parameter `id` cannot be undefined');
        return;
    } else if (id === '') {
        console.error('ERROR - getUserFollowsGroupId: Parameter `id` cannot be blank');
        return;
    }

    const path = `/user/follows/group/${id}`;
    const httpsRequestOptions = util.addTokenAuthorization(token);

    if (!httpsRequestOptions) return;

    return util.createHttpsRequestPromise<GetUserFollowsGroupIdResponse>('GET', path, httpsRequestOptions);
};
