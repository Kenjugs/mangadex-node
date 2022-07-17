declare namespace Schema {
    type RequiredPick<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;
    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys];

    type MangaRequest = {
        title?: LocalizedString
        altTitles?: LocalizedString[]
        description?: LocalizedString
        /** UUID formatted strings */
        authors?: string[]
        /** UUID formatted strings */
        artists?: string[]
        links?: object
        /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
        originalLanguage?: string
        lastVolume?: string | null
        lastChapter?: string | null
        publicationDemographic?: 'shounen' | 'shoujo' | 'josei' | 'seinen' | null
        status?: 'completed' | 'ongoing' | 'cancelled' | 'hiatus'
        /**
         * ```console
         * Minimum: 1
         * Maximum: 9999
         * ```
         */
        year?: number | null
        contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic'
        chapterNumbersResetOnNewVolume?: boolean
        /** UUID formatted strings */
        tags?: string[]
        /** UUID formatted string */
        primaryCover?: string | null
        /** ```console
         * Minimum: 1
         * ``` */
        version?: number
    };

    /**
     * The property name follows the pattern `^[a-z]{2,8}$`
     * 
     * Example:
     * ```json
     * {
     *   "en": "The Quintessential Quintuplets"
     * }
     * ```
     */
    type LocalizedString = Record<string, string>;

    type MangaResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: Manga
    };

    type ChapterResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: Chapter
    };

    type Relationship = {
        /** UUID formatted string */
        id: string
        type: string
        /** Only present if you are on a Manga entity and a Manga relationship */
        related: 'monochrome' | 'main_story' | 'adapted_from' | 'based_on' | 'prequel' | 'side_story' | 'doujinshi' | 'same_franchise' | 'shared_universe' | 'sequel' | 'spin_off' | 'alternate_story' | 'alternate_version' | 'preserialization' | 'colored' | 'serialization'
        /** If Reference Expansion is applied, contains objects attributes */
        attributes: object | null
    };

    type Chapter = {
        /** UUID formatted string */
        id: string
        type: 'chapter'
        attributes: ChapterAttributes
        relationships: Relationship[]
    };

    type Manga = {
        /** UUID formatted string */
        id: string
        type: 'manga'
        attributes: MangaAttributes
        relationships: Relationship[]
    };

    type ErrorResponse = {
        /** Default: "error" */
        result: string
        errors: Error[]
    };

    type Error = {
        id: string
        status: number
        title: string
        detail: string
    };

    type ChapterAttributes = {
        /** ```console
         * Maximum length: 255
         * ``` */
        title: string
        volume: string | null
        /** ```console
         * Maximum length: 8
         * ``` */
        chapter: string | null
        pages: number
        /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
        translatedLanguage: string
        /** UUID formatted string */
        uploader: string
        /** ```console
         * Maximum length: 512
         * Pattern: ^https?://
         * ``` */
        externalUrl: string | null
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
        createdAt: string
        updatedAt: string
        publishAt: string
        readableAt: string
    };

    type MangaAttributes = {
        title: LocalizedString
        altTitles: LocalizedString[]
        description: LocalizedString
        isLocked: boolean
        links: object
        originalLanguage: string
        lastVolume: string | null
        lastChapter: string | null
        publicationDemographic: 'shounen' | 'shoujo' | 'josei' | 'seinen' | null
        status: 'completed' | 'ongoing' | 'cancelled' | 'hiatus'
        year: number | null
        contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic'
        chapterNumbersResetOnNewVolume: boolean
        availableTranslatedLanguages: any[]
        tags: Tag[]
        state: 'draft' | 'submitted' | 'published' | 'rejected'
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
        createdAt: string
        updatedAt: string
    };

    /** 
     * Required properties:
     * ```console
     * - title
     * - status
     * - originalLanguage
     * - contentRating
     * ```
     */
    type MangaCreate = RequiredPick<MangaRequest, 'title' | 'status' | 'originalLanguage' | 'contentRating'>;

    /**
     * Required properties:
     * ```console
     * - version
     * ```
     */
    type MangaEdit = RequiredPick<MangaRequest, 'version'>;

    /**
     * Required properties:
     * ```console
     * - version
     * ```
     */
    type ChapterEdit = RequiredPick<ChapterRequest, 'version'>;

    type Response = {
        result: 'ok' | 'error'
    };

    type Login = RequireAtLeastOne<{
        /** ```console
         * Minimum length: 1
         * Maximum length: 64
         * ``` */
        username?: string
        email?: string
        /** ```console
         * Minimum length: 8
         * Maximum length: 1024
         * ``` */
        password: string
    }, 'username' | 'email'>;

    type LoginResponse = {
        result: 'ok' | 'error'
        token: { session: string, refresh: string }
    };

    type CheckResponse = {
        /** Default: "ok" */
        result: string
        isAuthenticated: boolean
        roles: string[]
        permissions: string[]
    };

    type LogoutResponse = {
        result: 'ok' | 'error'
    };

    type RefreshToken = {
        /** ```console
         * Minimum length: 1
         * ``` */
        token: string
    };

    type RefreshResponse = {
        result: 'ok' | 'error'
        token?: { session: string, refresh: string }
        message?: string
    };

    type AccountActivateResponse = {
        result: 'ok'
    };

    type CreateAccount = {
        /** ```console
         * Minimum length: 1
         * Maximum length: 64
         * ``` */
        username: string
        /** ```console
         * Minimum length: 8
         * Maximum length: 1024
         * ``` */
        password: string
        email: string
    };

    type ScanlationGroupResponse = {
        result: 'ok'
        /** Default: "entity" */
        response: string
        data: ScanlationGroup
    };

    type ScanlationGroup = {
        /** UUID formatted string */
        id: string
        type: 'scanlation_group'
        attributes: ScanlationGroupAttributes
        relationships: Relationship[]
    };

    type ScanlationGroupAttributes = {
        name: string
        altNames: LocalizedString[]
        website: string | null
        ircServer: string | null
        ircChannel: string | null
        discord: string | null
        contactEmail: string | null
        description: string | null
        /** Pattern: `^https?://` */
        twitter: string | null
        /** ```console
         * Maximum length: 128
         * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
         */
        mangaUpdates: string | null
        /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
        focusedLanguage: string[] | null
        locked: boolean
        official: boolean
        inactive: boolean
        /**
         * Should respect ISO 8601 duration specifications: https://en.wikipedia.org/wiki/ISO_8601#Durations
         * 
         * Pattern: `^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$`
         */
        publishDelay: string
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
        createdAt: string
        updatedAt: string
    };

    type User = {
        /** UUID formatted string */
        id: string
        type: 'user'
        attributes: UserAttributes
        relationships: Relationship[]
    };

    type UserAttributes = {
        username: string
        roles: string[]
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type CreateScanlationGroup = {
        name: string
        website?: string | null
        ircServer?: string | null
        ircChannel?: string | null
        discord?: string | null
        contactEmail?: string | null
        description?: string | null
        /** Pattern: `^https?://twitter\.com` */
        twitter?: string | null
        /** ```console
         * Maximum length: 128
         * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
         * ``` */
        mangaUpdates?: string | null
        inactive?: boolean
        /** Pattern: `^P(([1-9]|[1-9][0-9])D)?(([1-9])W)?(T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$` */
        publishDelay?: string | null
    };

    type ScanlationGroupEdit = {
        name?: string
        /** UUID formatted string */
        leader?: string
        /** UUID formatted strings */
        members?: string[]
        website?: string | null
        ircServer?: string | null
        ircChannel?: string | null
        discord?: string | null
        contactEmail?: string | null
        description?: string | null
        /** Pattern: `^https?://` */
        twitter?: string | null
        /** ```console
         * Maximum length: 128
         * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
         * ``` */
        mangaUpdates?: string | null
        /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
        focusedLanguages?: string[] | null
        inactive?: boolean
        locked?: boolean
        publishDelay?: string
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type CustomListCreate = {
        name: string
        visibility?: 'public' | 'private'
        /** UUID formatted strings */
        manga?: string[]
        /** ```console
         * Minimum: 1
         * ``` */
        version?: number
    };

    type CustomListEdit = {
        name?: string
        visibility?: 'public' | 'private'
        /** UUID formatted strings */
        manga?: string[]
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type CustomListResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: CustomList
    };

    type CustomList = {
        /** UUID formatted string */
        id: string
        type: 'custom_list'
        attributes: CustomListAttributes
        relationships: Relationship[]
    };

    type CustomListAttributes = {
        name: string
        visibility: 'public' | 'private'
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type CoverResponse = {
        result: string
        /** Default: "entity" */
        response: string
        data: Cover
    };

    type Cover = {
        /** UUID formatted string */
        id: string
        type: 'cover_art'
        attributes: CoverAttributes
        relationships: Relationship[]
    };

    type CoverAttributes = {
        volume: string | null
        fileName: string
        description: string | null
        locale: string | null
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
        createdAt: string
        updatedAt: string
    };

    type CoverEdit = {
        /** ```console
         * Minimum length: 0
         * Maximum length: 8
         * ``` */
        volume: string | null
        /** ```console
         * Minimum length: 0
         * Maximum length: 512
         * ``` */
        description?: string | null
        /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
        locale?: string | null
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type AuthorResponse = {
        result: string
        /** Default: "entity" */
        response: string
        data: Author
    };

    type Author = {
        /** UUID formatted string */
        id: string
        type: 'author'
        attributes: AuthorAttributes
        relationships: Relationship[]
    };

    type AuthorAttributes = {
        name: string
        imageUrl: string
        biography: LocalizedString
        /** Pattern: ^https?:\/\/twitter\.com(\/|$) */
        twitter: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?pixiv\.net(\/|$) */
        pixiv: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?melonbooks\.co\.jp(\/|$) */
        melonBook: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?fanbox\.cc(\/|$) */
        fanBox: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?booth\.pm(\/|$) */
        booth: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?nicovideo\.jp(\/|$) */
        nicoVideo: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?skeb\.jp(\/|$) */
        skeb: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?fantia\.jp(\/|$) */
        fantia: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?tumblr\.com(\/|$) */
        tumblr: string | null
        /** Pattern: ^https?:\/\/www\.youtube\.com(\/|$) */
        youtube: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?weibo\.(cn|com)(\/|$) */
        weibo: string | null
        /** Pattern: ^https?:\/\/([\w-]+\.)?naver\.com(\/|$) */
        naver: string | null
        /** Pattern: ^https?:\/\/ */
        website: string | null
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
        createdAt: string
        updatedAt: string
    };

    /**
     * Required properties:
     * ```console
     * - version
     * ```
     */
    type AuthorEdit = RequiredPick<Partial<Omit<AuthorAttributes, 'imageUrl' | 'createdAt' | 'updatedAt'>>, 'version'>;

    /**
     * Required properties:
     * ```console
     * - name
     * ```
     */
    type AuthorCreate = RequiredPick<Partial<Omit<AuthorAttributes, 'imageUrl' | 'createdAt' | 'updatedAt'>>, 'name'>;

    type MappingIdBody = {
        type: 'group' | 'manga' | 'chapter' | 'tag'
        ids: number[]
    };

    type MappingIdResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: MappingId[]
        limit: number
        offset: number
        total: number
    };

    type MappingId = {
        /** UUID formatted string */
        id: string
        type: 'mapping_id'
        attributes: MappingIdAttributes
        relationships: Relationship[]
    };

    type MappingIdAttributes = {
        type: 'manga' | 'chapter' | 'group' | 'tag'
        legacyId: number
        /** UUID formatted string */
        newId: string
    };

    type TagResponse = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Tag[]
        limit: number
        offset: number
        total: number
    };

    type Tag = {
        /** UUID formatted string */
        id: string
        type: 'tag'
        attributes: TagAttributes
        relationships: Relationship[]
    };

    type TagAttributes = {
        name: LocalizedString
        description: LocalizedString
        group: string
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type UserResponse = {
        result: 'ok'
        /** Default: "entity" */
        response: string
        data: User
    };

    type SendAccountActivationCode = {
        email: string
    };

    type RecoverCompleteBody = {
        /**
         * ```console
         * Minimum length: 8
         * Maximum length: 1024
         * ```
         */
        newPassword: string
    };

    type UpdateMangaStatus = {
        status: 'reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed' | null
    };

    type ChapterRequest = {
        /**
         * ```console
         * Maximum length: 255
         * ```
         */
        title?: string | null
        volume?: string | null
        /**
         * ```console
         * Maximum length: 8
         * ```
         */
        chapter?: string | null
        /** Pattern: ^[a-z]{2}(-[a-z]{2})?$ */
        translatedLanguage?: string
        /**
         * UUID formatted strings
         * 
         * ```console
         * Maximum array length: 10
         * Individual string lengths must be 36 characters
         * ``` 
         */
        groups?: string[]
        /** ```console
         * Minimum: 1
         * ``` */
        version?: number
    };

    type CoverList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Cover[]
        limit: number
        offset: number
        total: number
    };

    type AuthorList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Author[]
        limit: number
        offset: number
        total: number
    };

    type ChapterList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Chapter[]
        limit: number
        offset: number
        total: number
    };

    type ScanlationGroupList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: ScanlationGroup[]
        limit: number
        offset: number
        total: number
    };

    type MangaRelationCreate = RequiredPick<MangaRelationRequest, 'targetManga' | 'relation'>;

    type MangaRelationRequest = {
        /** UUID formatted string */
        targetManga?: string
        relation?: 'monochrome' | 'main_story' | 'adapted_from' | 'based_on' | 'prequel' | 'side_story' | 'doujinshi' | 'same_franchise' | 'shared_universe' | 'sequel' | 'spin_off' | 'alternate_story' | 'alternate_version' | 'preserialization' | 'colored' | 'serialization'
    };

    type MangaRelationList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: MangaRelation[]
        limit: number
        offset: number
        total: number
    };

    type MangaRelationResponse = {
        result: 'ok' | 'error'
        /** Default: "entity" */
        response: string
        data: MangaRelation
    };

    type MangaRelation = {
        /** UUID formatted string */
        id: string
        type: 'manga_relation'
        attributes: MangaRelationAttributes
        relationships: Relationship[]
    };

    type MangaRelationAttributes = {
        relation: 'monochrome' | 'main_story' | 'adapted_from' | 'based_on' | 'prequel' | 'side_story' | 'doujinshi' | 'same_franchise' | 'shared_universe' | 'sequel' | 'spin_off' | 'alternate_story' | 'alternate_version' | 'preserialization' | 'colored' | 'serialization'
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type MangaList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: Manga[]
        limit: number
        offset: number
        total: number
    };

    type CustomListList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: CustomList[]
        limit: number
        offset: number
        total: number
    };

    type UserList = {
        /** Default: "ok" */
        result: string
        /** Default: "collection" */
        response: string
        data: User[]
        limit: number
        offset: number
        total: number
    };

    type UploadSession = {
        /** UUID formatted string */
        id: string
        type: 'upload_session'
        attributes: UploadSessionAttributes
    };

    type UploadSessionAttributes = {
        isCommitted: boolean
        isProcessed: boolean
        isDeleted: boolean
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
        createdAt: string
        updatedAt: string
    };

    type UploadSessionFile = {
        /** UUID formatted string */
        id: string
        type: 'upload_session_file'
        attributes: UploadSessionFileAttributes
    };

    type UploadSessionFileAttributes = {
        originalFileName: string
        fileHash: string
        fileSize: number
        mimeType: string
        source: 'local' | 'remote'
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    /** NOTE: At least one property is required to be present */
    type ChapterReadMarkerBatch = RequireAtLeastOne<{
        /** Length of 36 UUID formatted strings */
        chapterIdsRead?: string[]
        /** Length of 36 UUID formatted strings */
        chapterIdsUnread?: string[]
    }, 'chapterIdsRead' | 'chapterIdsUnread'>;

    type BeginUploadSession = {
        /**
         * UUID formatted strings
         * 
         * ```console
         * Maximum array length: 10
         * Individual string lengths must be 36 characters
         * ``` 
         */
        groups: string[]
        /**
         * UUID formatted string
         * 
         * Must be 36 characters
         */
        manga: string[]
    };

    type BeginEditSession = {
        /** ```console
         * Minimum: 1
         * ``` */
        version: number
    };

    type CommitUploadSession = {
        chapterDraft: ChapterDraft
        /**
         * UUID formatted strings
         * 
         * ```console
         * Minimum array length: 1
         * Maximum array length: 500
         * Individual string lengths must be 36 characters
         * ```
         */
        pageOrder: string[]
    };

    type ChapterDraft = {
        /**
         * Pattern: ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
         * 
         * ```console
         * Maximum length: 8
         * ```
         */
        volume: string | null
        /**
         * Pattern: ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
         * 
         * ```console
         * Maximum length: 8
         * ```
         */
        chapter: string | null
        /** ```console
         * Maximum length: 255
         * ``` */
        title: string | null
        /** Pattern: ^[a-z]{2}(-[a-z]{2})?$ */
        translatedLanguage: string
        /**
         * Pattern: ^https?://
         * 
         * ```console
         * Maximum length: 512
         * ```
         */
        externalUrl?: string | null
        /** Pattern: ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */
        publishAt?: string
    };

    type ReportListResponse = {
        result: 'ok' | 'error'
        /** Default: "collection" */
        response: string
        data: Report[]
        limit: number
        offset: number
        total: number
    };

    type Report = {
        /** UUID formatted string */
        id: string
        type: 'report'
        attributes: ReportAttributes
        relationships: Relationship[]
    };

    type ReportAttributes = {
        details: string
        objectId: string
        status: 'waiting' | 'accepted' | 'refused' | 'autoresolved'
        createdAt: string
    };

    type ReferenceExpansion = ('manga' | 'chapter' | 'cover_art' | 'author' | 'artist' | 'scanlation_group' | 'tag' | 'user' | 'custom_list')[]
}

export = Schema;
