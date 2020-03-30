const knex = require('knex');
const config = require('../../knexfile.js');

const db_config = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(db_config);

module.exports = connection;
