import mapKeys from 'lodash/mapKeys';

export const prefixKeys = (object, prefix) => {
  return mapKeys(object, (_value, key) => {
    return `${prefix}${key}`;
  });
};

export default {
  prefixKeys
};
