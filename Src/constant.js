import axios from 'axios';
// import encryptData from './utility/Encryption/index';
// import decryptData  from './utility/Decryption/index';
console.log('Interceptor hit')




// const addEncryptionInterceptor = (axiosInstance, publicKey) => {
//   axiosInstance.interceptors.request.use(
//     async (config) => {
  
//       console.log("Before encryption:",config.data);

//       if (config.method === 'post' || config.method === 'put') {
//         try {
//           const encryptedData = await encryptData(config.data, publicKey);
//           config.data = encryptedData;
//            console.log("After encryption:", config.data);
//         } catch (error) {
//           console.error('Encryption failed:', error);
//         }
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return axiosInstance;
// };





// export const addDecryptionInterceptor = (axiosInstance, clientPrivateKey) => {
//   axiosInstance.interceptors.response.use(
//     async (response) => {
//       try {
//         if (response.data?.x1 && response.data?.y2) {
//           // only decrypt if looks like encrypted response
//           const decrypted = await decryptData(response.data, clientPrivateKey);
//           response.data = decrypted; // replace raw encrypted response with plaintext
//         }
//       } catch (error) {
//         console.error('Decryption failed:', error);
//       }
//       return response;
//     },
//     (error) => Promise.reject(error),
//   );

//   return axiosInstance;
// };


//UAT










const baseURL = 'https://backendforpronative.onrender.com';

export const AUTH_URI = axios.create({
  baseURL: `${baseURL}/api/auth`,
});

 
export const TABLE_URI = axios.create({
  baseURL: `${baseURL}/api/tables`,
});

export const COFFE_URL = axios.create({
   baseURL: `${baseURL}/api/coffees`,


});



export const ORDER_URL = axios.create({
   baseURL: `${baseURL}/api/orders`

})
















// export const AUTH_URI_INTERCEPT = (publicKey) => {
//   return addEncryptionInterceptor(
//     axios.create({baseURL: `${baseURL}/api/auth`}),
//     publicKey,
//   );
// };

// export const AUTH_URI_DECRYPT_INTERCEPT = (clientPrivateKey) => {
//   return addDecryptionInterceptor(
//     axios.create({ baseURL: `${baseURL}/api/auth` }),
//     clientPrivateKey,
//   );
// };














// //DEV
// const baseURL = 'https://uatdev.eaglelionsystems.com/v1.0/chatbirrapi';

// export const AUTH_URI_INTERCEPT = (publicKey: any) => {
//   return addEncryptionInterceptor(
//     axios.create({baseURL: `${baseURL}/authenticator`}),
//     publicKey,
//   );
// };



// export const LDAP_URI_INTERCEPT = (publicKey: any) => {
//   return addEncryptionInterceptor(
//     axios.create({baseURL: `${baseURL}/ldapotp/dash`}),
//     publicKey,
//   );
// };

// export const LDAP_URI = axios.create({
//   baseURL: `${baseURL}/ldapotp/dash`,
// });

// export const MFA_URI_INTERCEPT = (publicKey: any) => {
//   return addEncryptionInterceptor(
//     axios.create({baseURL: `${baseURL}/ldapotp/mfa`}),
//     publicKey,
//   );
// };

// export const MFA_URI = axios.create({
//   baseURL: `${baseURL}/mfa`,
// });

// export const USERS_URI_INTERCEPT = (publicKey: any) => {
//   return addEncryptionInterceptor(
//     axios.create({baseURL: `${baseURL}/users`}),
//     publicKey,
//   );
// };

// export const OTP_URI_INTERCEPT = (publicKey: any) => {
//   return addEncryptionInterceptor(
//     axios.create({baseURL: `${baseURL}/otp`}),
//     publicKey,
//   );
// };
// export const OTP_URI = axios.create({baseURL: `${baseURL}/otp`});
