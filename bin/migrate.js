import db from '../models';
const debug = require('debug')('app:bin:migrate');

for (let key in db) {
  if (key !== 'DB' && db.hasOwnProperty(key)) {
    debug(`Sync: ${key}`);
    db[key].sync({ force: true });
  }
}
