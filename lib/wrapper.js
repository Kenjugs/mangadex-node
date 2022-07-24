'use strict';

const account = require('./account');
const auth = require('./authentication');
const author = require('./author');
const chapter = require('./chapter');
const common = require('./common');
const cover = require('./cover');
const group = require('./group');
const list = require('./list');
const manga = require('./manga');
const user = require('./user');

module.exports = {
    account: account,
    auth: auth,
    author: author,
    chapter: chapter,
    common: common,
    cover: cover,
    group: group,
    list: list,
    manga: manga,
    user: user,
};
