import EncryptedStorage from 'react-native-encrypted-storage';


export const storeData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value); 
    await EncryptedStorage.setItem(key, jsonValue); 
  } catch (e) {
    console.error('Error storing data:', e);
  }
};


export const getData = async (key: string) => {
  try {
    const data = await EncryptedStorage.getItem(key); 
    if (data !== null && data !== undefined) {
      return JSON.parse(data);
    }
    return false; 
  } catch (e) {
    console.error('Error reading data:', e);
    return false;
  }
};

// 🧩 3. Remove data securely
export const removeData = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
};
