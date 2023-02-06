/********************
 * IMPORT STATEMENTS
 ********************/

import { CreateAccount, UserResponse, AccountActivateResponse, SendAccountActivationCode, RecoverCompleteBody, ErrorResponse } from './schema';
import * as util from './util';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `GET /account/available` */
export type GetAccountAvailableResponse = {
    available: boolean
};

/** Request options for `POST /account/create` */
export type PostAccountCreateRequestOptions = CreateAccount;

/** Response from `POST /account/create` */
export type PostAccountCreateResponse = UserResponse;

/** Response from `POST /account/activate/{code}` */
export type GetAccountActivateCodeResponse = AccountActivateResponse;

/** Request options for `POST /account/activate/resend` */
export type PostAccountActivateResendRequestOptions = SendAccountActivationCode;

/** Response from `POST /account/activate/resend` */
export type PostAccountActivateResendResponse = AccountActivateResponse;

/** Request options for `POST /account/recover` */
export type PostAccountRecoverRequestOptions = SendAccountActivationCode;

/** Response from `POST /account/recover` */
export type PostAccountRecoverResponse = AccountActivateResponse;

/** Request options for `POST /account/recover/{code}` */
export type PostAccountRecoverCodeRequestOptions = RecoverCompleteBody;

/** Response from `POST /account/recover/{code}` */
export type PostAccountRecoverCodeResponse = AccountActivateResponse;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Check if an account username is available for account creation.
 * 
 * @param {string} username Username to check availability of
 * @returns A promise that resolves to a {@link GetAccountAvailableResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
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


/**
 * Creates a new user acount with the provided information.
 * 
 * @param {PostAccountCreateRequestOptions} options Request options that include username, password, and email of new account
 * @returns A promise that resolves to a {@link PostAccountCreateResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAccountCreate = function (options: PostAccountCreateRequestOptions) {
    if (!options) {
        return Promise.reject('ERROR - postAccountCreate: Parameter `options` cannot be undefined');
    } else if (!options.username || options.username === '') {
        return Promise.reject('ERROR - postAccountCreate: Request missing required value `username`');
    } else if (!options.password || options.password === '') {
        return Promise.reject('ERROR - postAccountCreate: Request missing required value `password`');
    } else if (!options.email || options.email === '') {
        return Promise.reject('ERROR - postAccountCreate: Request missing required value `email`');
    }

    const req = {
        body: options,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = '/account/create';

    return util.createHttpsRequestPromise<PostAccountCreateResponse>('POST', path, req);
};

/**
 * Activates an account using the account activation code.
 * 
 * @param {string} code Activation code. Pattern: [0-9a-fA-F-]+
 * @returns A promise that resolves to a {@link GetAccountActivateCodeResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getAccountActivateCode = function (code: string) {
    if (code === undefined) {
        return Promise.reject('ERROR - getAccountActivateCode: Parameter `code` cannot be undefined');
    } else if (!code.match(/^[0-9a-fA-F-]+$/)) {
        return Promise.reject('ERROR - getAccountActivateCode: Invalid format for parameter `code`');
    }

    const path = `/account/activate/${code}`;

    return util.createHttpsRequestPromise<GetAccountActivateCodeResponse>('POST', path);
};

/**
 * Resends an account activation code to the supplied email.
 * 
 * @param {PostAccountActivateResendRequestOptions} options Request options that include email of account
 * @returns A promise that resolves to a {@link PostAccountActivateResendResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAccountActivateResend = function (options: PostAccountActivateResendRequestOptions) {
    if (!options.email || options.email === '') {
        return Promise.reject('ERROR - postAccountActivateResend: Request missing required value `email`');
    }

    const req = {
        body: options,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = '/account/activate/resend';

    return util.createHttpsRequestPromise<PostAccountActivateResendResponse>('POST', path, req);
};

/**
 * Send a request to recover an account. Can only be requested once per hour for the same email address.
 * 
 * @param {PostAccountRecoverRequestOptions} options Request options that include email of account
 * @returns A promise that resolves to a {@link PostAccountRecoverResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAccountRecover = function (options: PostAccountRecoverRequestOptions) {
    if (!options.email || options.email === '') {
        return Promise.reject('ERROR - postAccountRecover: Request missing required value `email`');
    }

    const req = {
        body: options,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = '/account/recover';

    return util.createHttpsRequestPromise<PostAccountRecoverResponse>('POST', path, req);
};

/**
 * Complete the account recovery process with a supplied new password.
 * 
 * @param {PostAccountRecoverCodeRequestOptions} options Request options that include a new password for the account
 * @returns A promise that resolves to a {@link PostAccountRecoverCodeResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const postAccountRecoverCode = function (code: string, options: PostAccountRecoverCodeRequestOptions) {
    if (code === undefined) {
        return Promise.reject('ERROR - postAccountRecoverCode: Parameter `code` cannot be undefined');
    } else if (!options.newPassword || options.newPassword === '') {
        return Promise.reject('ERROR - postAccountRecoverCode: Request missing required value `newPassword`');
    }

    const req = {
        body: options,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const path = `/account/recover/${code}`;

    return util.createHttpsRequestPromise<PostAccountRecoverCodeResponse>('POST', path, req);
};
