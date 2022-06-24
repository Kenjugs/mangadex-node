'use strict';

const account = require('./account');
const auth = require('./authentication');
const chapter = require('./chapter');
const common = require('./common');
const group = require('./group');
const list = require('./list');
const manga = require('./manga');
const user = require('./user');

module.exports = {
    account: account,
    auth: auth,
    chapter: chapter,
    common: common,
    group: group,
    list: list,
    manga: manga,
    user: user,
};
