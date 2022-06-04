import CommonAPI from "./common";

declare namespace AuthAPI {
    /*******************
     * TYPE DEFINITIONS
     *******************/

    /** Authentication token used for logging in to a user account */
    declare type AuthenticationToken = {
        session: string
        refresh: string
    };

    /** Login object for logging in and obtaining an auth token object. At least one of username or email is required. */
    declare type Login = {
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

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    /** Response from `POST /auth/login` */
    declare type AuthLoginResponse = {
        result: 'ok' | 'error'
        token: AuthenticationToken
    };

    /** Send account credentials and receive an authentication token */
    declare function authLogin(login: Login): Promise<AuthLoginResponse | CommonAPI.ErrorResponse>;
}

export = AuthAPI;
