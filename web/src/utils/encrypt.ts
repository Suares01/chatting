import * as cryptojs from "crypto-js/aes";
import * as encUtf8 from "crypto-js/enc-utf8";

const secret = import.meta.env.VITE_APP_ENCRYPT_SECRET;

export function encrypt(message: string) {
  return cryptojs.encrypt(message, secret).toString();
}

export function decrypt(ciphertext: string) {
  return cryptojs.decrypt(ciphertext, secret).toString(encUtf8);
}
