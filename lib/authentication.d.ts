import Schema from './schema';

declare namespace AuthAPI {
    /*******************
     * TYPE DEFINITIONS
     *******************/

    /** Authentication token issued when logging into a user account */
    type AuthenticationToken = {
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
    type AuthLoginRequestOptions = Schema.Login;

    /** Response from `POST /auth/login` */
    type AuthLoginResponse = Schema.LoginResponse;

    /** Response from `GET /auth/check` */
    type GetAuthCheckResponse = Schema.CheckResponse;

    /** Response from `POST /auth/logout` */
    type AuthLogoutResponse = Schema.LogoutResponse;

    /** Response from `POST /auth/refresh` */
    type AuthRefreshResponse = Schema.RefreshResponse;

    /**
     * Send account credentials and receive an authentication token.
     * 
     * @param {AuthLoginRequestOptions} login See {@link AuthLoginRequestOptions}
     * @returns {Promise<AuthLoginResponse | Schema.ErrorResponse>} A promise that resolves to an {@link AuthLoginResponse} object
     */
    function authLogin(login: AuthLoginRequestOptions): Promise<AuthLoginResponse | Schema.ErrorResponse>;

    /**
     * Check if a session token is still valid.
     * 
     * @param {AuthenticationToken} token See {@link AuthenticationToken}
     * @returns {Promise<GetAuthCheckResponse>} A promise that resolves to a {@link GetAuthCheckResponse} object
     */
    function getAuthCheck(token: AuthenticationToken): Promise<GetAuthCheckResponse>;

    /**
     * Logs out of a currently valid session.
     * 
     * @param {AuthenticationToken} token See {@link AuthenticationToken}
     * @returns {Promise<AuthLogoutResponse | Schema.ErrorResponse>} A promise that resolves to an {@link AuthLogoutResponse} object
     */
    function authLogout(token: AuthenticationToken): Promise<AuthLogoutResponse | Schema.ErrorResponse>;

    /**
     * Refreshes a session token that has expired. Session tokens only last for 15
     * minutes; refresh tokens allow you to refresh expired session tokens for up
     * to a month without needing to re-authenticate. If the refresh token has
     * expired, you will need to log in again; you cannot refresh a refresh token
     * any other way.
     * 
     * @param {AuthenticationToken} token See {@link AuthenticationToken}
     * @returns {Promise<AuthRefreshResponse | Schema.ErrorResponse>} A promise that resolves to an {@link AuthRefreshResponse} object
     */
    function authRefresh(token: AuthenticationToken): Promise<AuthRefreshResponse | Schema.ErrorResponse>;
}

export = AuthAPI;
