/********************
 * ENUM DECLARATIONS
 ********************/

/** Enum for related manga type */
exports.RelatedMangaType = Object.freeze({
    MONOCHROME: 'monochrome',
    MAIN_STORY: 'main_story',
    ADAPTED_FROM: 'adapted_from',
    BASED_ON: 'based_on',
    PREQUEL: 'prequel',
    SIDE_STORY: 'side_story',
    DOUJINSHI: 'doujinshi',
    SAME_FRANCHISE: 'same_franchise',
    SHARED_UNIVERSE: 'shared_universe',
    SEQUEL: 'sequel',
    SPIN_OFF: 'spin_off',
    ALTERNATE_STORY: 'alternate_story',
    ALTERNATE_VERSION: 'alternate_version',
    PRESERIALIZATION: 'preserialization',
    COLORED: 'colored',
    SERIALIZATION: 'serialization',
});

/** Enum for order to return items in */
exports.Order = Object.freeze({
    ASC: 'asc',
    DESC: 'desc',
});
