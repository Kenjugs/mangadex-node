import CommonAPI from './common';

declare namespace AuthAPI {
    /*******************
     * TYPE DEFINITIONS
     *******************/

    /** Authentication token used for logging in to a user account */
    type AuthenticationToken = {
        session: string
        refresh: string
    };

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    /** Login object for logging in and obtaining an auth token object. At least one of username or email is required. */
    type AuthLoginRequestOptions = {
        /** 
         * ```console
         * Minimum length: 1
         * Maximum length: 64
         * ```
         */
        username?: string
        email?: string
        /**
         * ```console
         * Minimum length: 8
         * Maximum length: 1024
         * ```
         */
        password: string
    };

    /** Response from `POST /auth/login` */
    type AuthLoginResponse = {
        result: 'ok' | 'error'
        token: AuthenticationToken
    };

    /** Response from `GET /auth/check` */
    type GetAuthCheckResponse = {
        /** Default: "ok" */
        result: string
        isAuthenticated: boolean
        roles: string[]
        permissions: string[]
    };

    /** Response from `POST /auth/logout` */
    type AuthLogoutResponse = {
        result: 'ok' | 'error'
    };

    /** Response from `POST /auth/refresh` */
    type AuthRefreshResponse = {
        result: 'ok' | 'error'
        token?: AuthenticationToken
        message?: string
    };

    /**
     * Send account credentials and receive an authentication token
     * 
     * @param {AuthLoginRequestOptions} login See {@link AuthLoginRequestOptions}
     * @returns {Promise<AuthLoginResponse | CommonAPI.ErrorResponse>} A promise that resolves to an {@link AuthLoginResponse} object
     */
    function authLogin(login: AuthLoginRequestOptions): Promise<AuthLoginResponse | CommonAPI.ErrorResponse>;

    /**
     * Check if a session token is still valid
     * 
     * @param {AuthenticationToken} token See {@link AuthenticationToken}
     * @returns {Promise<GetAuthCheckResponse>} A promise that resolves to a {@link GetAuthCheckResponse} object
     */
    function getAuthCheck(token: AuthenticationToken): Promise<GetAuthCheckResponse>;

    /**
     * Logs out of a currently valid session
     * 
     * @param {AuthenticationToken} token See {@link AuthenticationToken}
     * @returns {Promise<AuthLogoutResponse | CommonAPI.ErrorResponse>} A promise that resolves to an {@link AuthLogoutResponse} object
     */
    function authLogout(token: AuthenticationToken): Promise<AuthLogoutResponse | CommonAPI.ErrorResponse>;

    /**
     * Refreshes a session token that has expired. Session tokens only last for 15
     * minutes; refresh tokens allow you to refresh expired session tokens for up
     * to a month without needing to re-authenticate. If the refresh token has
     * expired, you will need to log in again; you cannot refresh a refresh token
     * any other way.
     * 
     * @param {AuthenticationToken} token See {@link AuthenticationToken}
     * @returns {Promise<AuthRefreshResponse | ErrorResponse>} A promise that resolves to an {@link AuthRefreshResponse} object
     */
    function authRefresh(token: AuthenticationToken): Promise<AuthRefreshResponse | CommonAPI.ErrorResponse>;
}

export = AuthAPI;
