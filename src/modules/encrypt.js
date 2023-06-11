import CryptoJS from "crypto-js";

const key = "spootify-encrypt";

export const encrypt = (val) => {
  const result = CryptoJS.AES.encrypt(val, key).toString();
  return result;
};

export const decrypt = (val) => {
  if (val) {
    let removeDoubleQuote = val.replaceAll(/"/g, "");
    var bytes = CryptoJS.AES.decrypt(removeDoubleQuote, key);
    var result = bytes.toString(CryptoJS.enc.Utf8);
    return result;
  }
};
