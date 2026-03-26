import CryptoJS from 'crypto-js';
import * as secp256k1 from '@noble/secp256k1';
import { Buffer } from 'buffer';

const removePrefix = (keyHex: string) => keyHex.slice(2);

export const decryptData = async (
  responseBody: any,            // { x1, y2, z3, a4, b5 }
  clientPrivateKey: Uint8Array, // the private key you generated earlier
) => {
  try {
    const { x1: encryptedPayload, y2: ivHex, z3: authTag, b5: clientPublicKeyHex, a4: timestamp } =
      responseBody;

    // --- Derive shared secret ---
    // The "publicKey" here should be the other party’s public key.
    const otherPublicKeyBuffer = Buffer.from(clientPublicKeyHex, 'hex');

    const sharedSecret = await secp256k1.getSharedSecret(
      clientPrivateKey,
      otherPublicKeyBuffer,
    );
    const sharedSecretHex = Buffer.from(sharedSecret).toString('hex');
    const normalizedSharedSecret = removePrefix(sharedSecretHex);

    // --- Verify HMAC ---
    const recalculatedAuthTag = CryptoJS.HmacSHA256(
      ivHex + encryptedPayload,
      CryptoJS.enc.Hex.parse(normalizedSharedSecret),
    ).toString(CryptoJS.enc.Hex);

    if (recalculatedAuthTag !== authTag) {
      throw new Error('Auth tag mismatch! Possible tampering.');
    }

    // --- Decrypt ---
    const ivWordArray = CryptoJS.enc.Hex.parse(ivHex);
    const decryptedWordArray = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(encryptedPayload) },
      CryptoJS.enc.Hex.parse(normalizedSharedSecret),
      {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    const decryptedText = decryptedWordArray.toString(CryptoJS.enc.Utf8);

    // --- Parse original payload + checksum ---
    const { payload, checksum } = JSON.parse(decryptedText);

    const recalculatedChecksum = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
    if (recalculatedChecksum !== checksum) {
      throw new Error('Checksum mismatch! Decrypted data may be corrupted.');
    }

    // --- Return final usable data ---
    return JSON.parse(payload);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
};
