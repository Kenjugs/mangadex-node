declare namespace CommonAPI {
    /********************
     * ENUM DECLARATIONS
     ********************/

    /** Enum for related manga type */
    declare enum RelatedMangaType {
        MONOCHROME,
        MAIN_STORY,
        ADAPTED_FROM,
        BASED_ON,
        PREQUEL,
        SIDE_STORY,
        DOUJINSHI,
        SAME_FRANCHISE,
        SHARED_UNIVERSE,
        SEQUEL,
        SPIN_OFF,
        ALTERNATE_STORY,
        ALTERNATE_VERSION,
        PRESERIALIZATION,
        COLORED,
        SERIALIZATION,
    }

    /** Enum for order to return items in */
    declare enum Order {
        ASC,
        DESC,
    }

    /*******************
     * TYPE DEFINITIONS
     *******************/

    declare type ResponseError = {
        id: string
        status: number
        title: string
        detail: string
    };

    declare type ErrorResponse = {
        result: 'error'
        errors: ResponseError[]
    };

    declare type LocalizedString = Record<string, string>;

    declare type Links = {
        /**
         * anilist
         * ```console
         * https://anilist.co/manga/`{id}`
         * ```
         */
        al: string

        /**
         * animeplanet
         * ```console
         * https://www.anime-planet.com/manga/`{slug}`
         * ```
         */
        ap: string

        /**
         * bookwalker.jp
         * ```console
         * https://bookwalker.jp/`{slug}`
         * ```
         */
        bw: string

        /**
         * mangaupdates
         * ```console
         * https://www.mangaupdates.com/series.html?id=`{id}`
         * ```
         */
        mu: string

        /**
         * novelupdates
         * ```console
         * https://www.novelupdates.com/series/`{slug}`
         * ```
         */
        nu: string

        /**
         * kitsu.io
         * 
         * If integer, use id version of the URL, otherwise use slug one
         * 
         * ```console
         * https://kitsu.io/api/edge/manga/`{id}` or
         * https://kitsu.io/api/edge/manga?filter[slug]=`{slug}`
         * ```
         */
        kt: string
        /** amazon */
        amz: string
        /** ebookjapan */
        ebj: string

        /**
         * myanimelist
         * ```console
         * https://myanimelist.net/manga/{id}
         * ```
         */
        mal: string
        /** CDJapan */
        cdj: string
        /** Stored as full URL, untranslated stuff URL (original language) */
        raw: string
        /** Stored as full URL, official english licenced URL */
        engtl: string
    };

    declare type Relationship = {
        /** UUID formatted string */
        id: string
        type: string
        /** Related Manga type, only present if you are on a Manga entity and a Manga relationship */
        related?: RelatedMangaType
        /** If reference expansion is applied, contains objects attributes */
        attributes?: object
    };

    declare type TagAttributes = {
        name: LocalizedString
        description: LocalizedString
        group: string
        version: number
    };

    declare type Tag = {
        /** UUID formatted string */
        id: string
        type: 'tag'
        attributes: TagAttributes
        relationships: Relationship[]
    };
}

export = CommonAPI;
