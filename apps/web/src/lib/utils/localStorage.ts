function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItem(key: string) {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

export {
  setItem,
  getItem,
  removeItem,
};
