'use strict';

const account = require('./account');
const auth = require('./authentication');
const group = require('./group');
const list = require('./list');
const manga = require('./manga');

module.exports = {
    account: account,
    auth: auth,
    group: group,
    list: list,
    manga: manga,
};
