import config from '.';

let { db } = config;
let { username, password, database, host } = db;
let dialect = db.adapter;

export default {
  development: {
    username,
    password,
    database,
    host,
    dialect
  }
};
