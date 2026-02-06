const LocalStorage = require('./local.storage');

const storage = new LocalStorage('./storage');

module.exports = storage;
