import Cookies from "js-cookie";

export default {
  setItem(key, value) {
    Cookies.set(key, JSON.stringify(value));
  },
  setStringItem(key, value) {
    Cookies.set(key, value);
  },
  getItem(key) {
    return Cookies.get(key);
  },
  removeItem(key) {
    return Cookies.remove(key);
  },
};
