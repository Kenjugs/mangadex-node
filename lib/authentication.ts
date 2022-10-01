/********************
 * IMPORT STATEMENTS
 ********************/

import { isNativeError } from 'util/types';
import { Login, LoginResponse, CheckResponse, LogoutResponse, RefreshResponse, ErrorResponse } from './schema';
import * as util from './util';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Authentication token issued when logging into a user account */
export type AuthenticationToken = {
    session: string
    refresh: string
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/**
 * Request body for `POST /auth/login`
 * 
 * Login object for logging in and obtaining an auth token object.
 * At least one of username or email is required.
 */
export type AuthLoginRequestOptions = Login;

/** Response from `POST /auth/login` */
export type AuthLoginResponse = LoginResponse;

/** Response from `GET /auth/check` */
export type GetAuthCheckResponse = CheckResponse;

/** Response from `POST /auth/logout` */
export type AuthLogoutResponse = LogoutResponse;

/** Response from `POST /auth/refresh` */
export type AuthRefreshResponse = RefreshResponse;


/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Send account credentials and receive an authentication token.
 * 
 * @param {AuthLoginRequestOptions} login Login object containing username/email and password
 * @returns A promise that resolves to an {@link AuthLoginResponse} object.
 */
export const authLogin = function (login: AuthLoginRequestOptions) {
    if (login === undefined) {
        return Promise.reject('ERROR - authLogin: Parameter `login` cannot be undefined');
    } else if (!('username' in login) && !('email' in login)) {
        return Promise.reject('ERROR - authLogin: Parameter `login` missing both `login.username` and `login.email`');
    } else if (!('password' in login)) {
        return Promise.reject('ERROR - authLogin: Parameter `login` missing required property `login.password`');
    }

    const path = '/auth/login';

    const options = {
        body: login,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return util.createHttpsRequestPromise<AuthLoginResponse>('POST', path, options);
};

/**
 * Check if a session token is still valid.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to a {@link GetAuthCheckResponse} object.
 */
export const getAuthCheck = function (token: AuthenticationToken) {
    const path = '/auth/check';

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<GetAuthCheckResponse>('GET', path, httpsRequestOptions);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

/**
 * Logs out of a currently valid session.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to an {@link AuthLogoutResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const authLogout = function (token: AuthenticationToken) {
    const path = '/auth/logout';

    try {
        const httpsRequestOptions = util.addTokenAuthorization(token);
        return util.createHttpsRequestPromise<AuthLogoutResponse>('POST', path, httpsRequestOptions);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

/**
 * Refreshes a session token that has expired. Session tokens only last for 15
 * minutes; refresh tokens allow you to refresh session tokens for up to a month
 * without needing to re-authenticate. If the refresh token has expired, you
 * will need to log in again; you cannot refresh a refresh token any other way.
 * 
 * @param {AuthenticationToken} token See {@link AuthenticationToken}
 * @returns A promise that resolves to an {@link AuthRefreshResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const authRefresh = function (token: AuthenticationToken) {
    if (token === undefined) {
        return Promise.reject('ERROR - authRefresh: Parameter `token` cannot be undefined');
    } else if (!('refresh' in token)) {
        return Promise.reject('ERROR - authRefresh: Parameter `token` missing required property `refresh`');
    }

    const path = '/auth/refresh';

    const httpsRequestOptions = {
        body: {
            token: token.refresh,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return util.createHttpsRequestPromise<AuthRefreshResponse>('POST', path, httpsRequestOptions);
};
