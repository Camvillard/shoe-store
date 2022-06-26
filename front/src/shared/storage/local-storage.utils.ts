const STORAGE = localStorage;

export const setToLocalStorage = ({ key, value }: Record<string, string>) => {
  STORAGE.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return STORAGE.getItem(key);
};

export const isInLocalStorage = (key: string) => !!getFromLocalStorage(key);

export const removeFromLocalStorage = (key: string) => {
  STORAGE.removeItem(key);
};
