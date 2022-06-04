/*******************
 * TYPE DEFINITIONS
 *******************/

/** Authentication token used for logging in to a user account */
export type AuthenticationToken = {
    session: string
    refresh: string
};
