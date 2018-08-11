const bcrypt = require('bcrypt');

const hash = async password => await bcrypt.hash(password, 12);
const match = async (password, savedHash) => await bcrypt.compare(password, savedHash);

module.exports = { hash, match };
