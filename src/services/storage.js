const getStorageType = (type) => {
  let storageType;

  if (type === 'sessionStorage') {
    try {
      storageType = window.sessionStorage;
    } catch (error) {
      console.log('SessionStorage not supported');
    }
  } else {
    try {
      storageType = localStorage;
    } catch (error) {
      console.log('LocalStorage not supported');
    }
  }
  return storageType || {};
};

export const setItemToStorage = (key, data, storageType = 'localStorage') => {
  try {
    return getStorageType(storageType)?.setItem(key, JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const removeItemFromStorage = (key, storageType = 'localStorage') => {
  try {
    return getStorageType(storageType)?.removeItem(key);
  } catch (error) {
    return null;
  }
};

export const getItemFromStorage = (key, storageType = 'localStorage') => {
  try {
    return JSON.parse(getStorageType(storageType)?.getItem(key));
  } catch (error) {
    return null;
  }
};
