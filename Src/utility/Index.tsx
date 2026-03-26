import 'react-native-get-random-values'; // Add this at the very top
import CryptoJS from 'crypto-js';
import * as secp256k1 from '@noble/secp256k1';
import {Buffer} from 'buffer';

const encryptData = async (data: any, publicKey: string) => {
  try {
    const removePrefix = (keyHex: any) => {
      return keyHex.slice(2);
    };

    const SECP256K1_ORDER = BigInt(
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0684647',
    );

    const generatePrivateKey = () => {
      let privateKey;

      do {
        privateKey = new Uint8Array(32);
        crypto.getRandomValues(privateKey);
        const privateKeyBigInt = BigInt(
          `0x${Array.from(privateKey)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')}`,
        );

        if (privateKeyBigInt > 0n && privateKeyBigInt < SECP256K1_ORDER) {
          break;
        }
      } while (true);

      return privateKey;
    };

    const clientPrivateKey = generatePrivateKey();
    const clientPublicKey = await secp256k1.getPublicKey(clientPrivateKey);
    const clientPublicKeyHex = Buffer.from(clientPublicKey).toString('hex');

    const serverPublicKey = publicKey;

    const serverPublicKeyBuffer = Buffer.from(serverPublicKey, 'hex');

    const sharedSecret = await secp256k1.getSharedSecret(
      clientPrivateKey,
      serverPublicKeyBuffer,
    );
    const sharedSecretHex = Buffer.from(sharedSecret).toString('hex');

    const normalizedSharedSecret = removePrefix(sharedSecretHex);

    const payload = JSON.stringify(data);
    const checksum = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
    const fullPayload = JSON.stringify({payload, checksum});

    const iv = Buffer.alloc(16);
    for (let i = 0; i < 16; i++) {
      iv[i] = Math.floor(Math.random() * 256);
    }
    const ivHex = iv.toString('hex');

    const ivWordArray = CryptoJS.enc.Hex.parse(ivHex);

    const encryptedPayload = CryptoJS.AES.encrypt(
      fullPayload,
      CryptoJS.enc.Hex.parse(normalizedSharedSecret),
      {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).ciphertext.toString(CryptoJS.enc.Hex);

    const authTag = CryptoJS.HmacSHA256(
      ivHex + encryptedPayload,
      CryptoJS.enc.Hex.parse(normalizedSharedSecret),
    ).toString(CryptoJS.enc.Hex);

    const timestamp = Date.now();
    const requestBody = {
      x1: encryptedPayload,
      y2: ivHex,
      z3: authTag,
      a4: timestamp,
      b5: clientPublicKeyHex,
    };
    return requestBody;
  } catch (error) {
    throw error;
  }
};

export default encryptData;
