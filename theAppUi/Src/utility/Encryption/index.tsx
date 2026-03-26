import 'react-native-get-random-values'; // Add this at the very top
import CryptoJS from 'crypto-js';
import * as secp from '@noble/secp256k1';
import { Buffer } from 'buffer';

const encryptData = async (data: any, publicKey: string) => {
  try {
    const removePrefix = (keyHex: any) => keyHex.slice(2);

    // ✅ Generate client private & public key
    const clientPrivateKey = secp.utils.randomSecretKey();
    console.log('clinet privtkey', clientPrivateKey)
    const clientPublicKey = secp.getPublicKey(clientPrivateKey, false);
    console.log("clinet public key",clientPublicKey)
    
    // uncompressed
    const clientPublicKeyHex = Buffer.from(clientPublicKey).toString('hex');


    console.log('clientPublicKeyHex ',clientPublicKeyHex )


    console.log('publicKey',publicKey)

    // ✅ Convert server public key from hex
    const serverPublicKeyBuffer = Buffer.from(publicKey, 'hex');

    console.log('serverPublicKeyBuffer',serverPublicKeyBuffer)

    // ✅ Compute shared secret
    const sharedSecret = secp.getSharedSecret(
      clientPrivateKey,
      serverPublicKeyBuffer
    );
    const sharedSecretHex = Buffer.from(sharedSecret).toString('hex');
    const normalizedSharedSecret = removePrefix(sharedSecretHex);

    // ✅ Prepare payload with checksum
    const payload = JSON.stringify(data);
    const checksum = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
    const fullPayload = JSON.stringify({ payload, checksum });

    // ✅ Generate random IV
    const iv = Buffer.alloc(16);
    for (let i = 0; i < 16; i++) {
      iv[i] = Math.floor(Math.random() * 256);
    }
    const ivHex = iv.toString('hex');
    const ivWordArray = CryptoJS.enc.Hex.parse(ivHex);

    // ✅ Encrypt payload with AES
    const encryptedPayload = CryptoJS.AES.encrypt(
      fullPayload,
      CryptoJS.enc.Hex.parse(normalizedSharedSecret),
      {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).ciphertext.toString(CryptoJS.enc.Hex);

    // ✅ Auth tag
    const authTag = CryptoJS.HmacSHA256(
      ivHex + encryptedPayload,
      CryptoJS.enc.Hex.parse(normalizedSharedSecret)
    ).toString(CryptoJS.enc.Hex);

    // ✅ Build final request
    const timestamp = Date.now();
    const requestBody = {
      x1: encryptedPayload,
      y2: ivHex,
      z3: authTag,
      a4: timestamp,
      b5: clientPublicKeyHex, // client pub key (to be used for shared secret by server)
    };

    return requestBody;
  } catch (error) {
    throw error;
  }
};

export default encryptData;
