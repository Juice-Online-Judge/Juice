import nodefn from 'when/node';
import { readFile, writeFile } from 'fs';
import { randomBytes } from 'crypto';
import _debug from 'debug';
const debug = _debug('app:bin:keygen');

const envPath = '.env';

nodefn.call(randomBytes, 24)
  .then((buf) => {
    debug('Generate random bytes');
    return buf.toString('hex');
  })
  .then((key) => {
    nodefn.call(readFile, envPath, 'utf8')
      .then((data) => {
        debug('Read .env file');
        let result = data.replace(/APP_KEY=.*/g, `APP_KEY=${key}`);
        debug('Replace key');
        nodefn.call(writeFile, envPath, result, 'utf8')
          .catch((err) => console.log(err));
        debug('Write file');
        console.log(`New key is: ${key}`);
      });
  });
