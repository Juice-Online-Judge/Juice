import mapKeys from 'lodash/mapKeys';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isBoolean from 'lodash/isBoolean';
import forEach from 'lodash/forEach';

export const prefixKeys = (object, prefix) => {
  return mapKeys(object, (_value, key) => {
    return `${prefix}${key}`;
  });
};

export const createFormDataDeep = (object) => {
  const formData = new FormData();
  const createFormData = (data, prefix) => {
    if (isArray(data)) {
      forEach(data, (value) => {
        appendFormData(`${prefix}[]`, value);
      });
    } else if (isObject(data)) {
      forEach(data, (value, key) => {
        appendFormData(`${prefix}[${key}]`, value);
      });
    }
  };
  const appendFormData = (key, data) => {
    if (data === null) {
      return;
    }

    if (data instanceof File) {
      formData.append(key, data, data.name);
    } else if (!isArray(data) && !isObject(data)) {
      if (isBoolean(data)) {
        data = data ? 1 : 0;
      }
      formData.append(key, String(data));
    } else {
      createFormData(data, key);
    }
  };

  forEach(object, (value, key) => {
    appendFormData(key, value);
  });
  return formData;
};

export default {
  prefixKeys,
  createFormDataDeep
};
