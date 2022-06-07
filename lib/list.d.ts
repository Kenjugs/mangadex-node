import CommonAPI from './common';

declare namespace ListAPI {
    /********************
     * TYPE DECLARATIONS
     ********************/

    declare type CustomListAttributes = {
        name: string
        visibility: 'private' | 'public'
        version: number
    };

    declare type CustomList = {
        /** UUID formatted string */
        id: string
        type: 'custom_list'
        attributes: CustomListAttributes
        relationships: CommonAPI.Relationship[]
    };

    /***********************
     * API REQUEST/RESPONSE
     ***********************/

    /**  */
    declare type GetListIdResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: CustomList
    };

    /**
     * Get info about a list by its ID
     * 
     * @param {string} listId UUID formatted string
     * @returns {Promise<GetListIdResponse | CommonAPI.ErrorResponse>} A promise that resolves to a {@link GetListIdResponse} object
     */
    declare function getListId(listId: string): Promise<GetListIdResponse | CommonAPI.ErrorResponse>;
};

export = ListAPI;
