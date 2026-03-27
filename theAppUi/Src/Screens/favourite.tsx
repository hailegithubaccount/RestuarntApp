import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUserStore } from '../store/userStore';

export default function Dashboard() {
  const user = useUserStore(state => state.user);  
  const logout = useUserStore(state => state.logout); 

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1 
    }}>
      {user ? (
        <>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Welcome {user.username || user.name || 'User'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Role: {user.email || 'N/A'}
          </Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text style={{ fontSize: 18 }}>No user logged in</Text>
      )}
    </View>
  );
}











// import 'react-native-get-random-values';
// import {
//     Alert,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//     Button,
//     ActivityIndicator,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// // import { useRequest } from '../Hooks/useRquest';
// import { Register$, registerUser$ } from '../Api/Auth/NewUser/Index';
// import * as Yup from 'yup';
// import { utils, getPublicKey } from '@noble/secp256k1';
// import { Buffer } from 'buffer';
// import { useTranslationStore } from '../store/translationStore';
// import CustomButton from '../Components/Button';
// import CustomAlert from '../Components/Alert';

// const Register = ({ navigation }) => {
//     const [userName, setUserName] = useState('');
//     const [Email, setEmail] = useState('');
//     const [Password, setPassword] = useState('');

//     const [ShowAlertTOAmaric, setShowAlertTOAmaric] = useState(false);
//     const [ShowAlertToEnglish, setShowAlertToEnglish] = useState(false);

//     const allFilled = userName && Email && Password;

//     const translation = useTranslationStore(state => state.translation);
//     const currentLanguage = useTranslationStore(state => state.currentLanguage);
//     const setCurrentLanguage = useTranslationStore(
//         state => state.setCurrentLanguage,
//     );

//     // const registerReq = useRequest();

//     let validationSchema = Yup.object().shape({
//         userName: Yup.string().required('Username is required'),
//         Email: Yup.string().email('Invalid email').required('Email is required'),
//         Password: Yup.string().required('Password is required'),
//     });

//     // const RegisterUser = async () => {
//     //   try {
//     //     await validationSchema.validate(
//     //       { userName, Email, Password },
//     //       { abortEarly: false }
//     //     );

//     //     const data = {
//     //       username: userName.toLowerCase(),
//     //       email: Email.toLowerCase(),
//     //       password: Password,
//     //     };

//     //     await registerReq.doRequest(Register$(data));
//     //   } catch (err) {
//     //     if (err.inner) {
//     //       const messages = err.inner.map(e => e.message).join('\n');
//     //       Alert.alert('Validation Error', messages);
//     //     } else {
//     //       console.error(err);
//     //       Alert.alert('Error', 'Something went wrong');
//     //     }
//     //   }
//     // };

//     // for the secure registration by using the acs encryption decryption

//     // Server private key (for demo only)
//     const serverPrivateKey = utils.randomSecretKey();

//     // Server public key (uncompressed, 65 bytes)
//     const publicKey = getPublicKey(serverPrivateKey);
//     console.log(
//         'Server Public Key (hex):',
//         Buffer.from(publicKey).toString('hex'),
//     );

//     const RegisterUser = async () => {
//         try {
//             await validationSchema.validate(
//                 { userName, Email, Password },
//                 { abortEarly: false },
//             );

//             const data = {
//                 username: userName.toLowerCase(),
//                 email: Email.toLowerCase(),
//                 password: Password,
//             };

//             await registerReq.doRequest(registerUser$(data, publicKey));
//         } catch (err) {
//             if (err.inner) {
//                 const messages = err.inner.map(e => e.message).join('\n');
//                 Alert.alert('Validation Error', messages);
//             } else {
//                 console.error(err);
//                 Alert.alert('Error', 'Something went wrong');
//             }
//         }
//     };

//     useEffect(() => {
//         if (registerReq.isSuccess) {
//             console.log(registerReq?.response);
//             Alert.alert('Success', 'User registered successfully');
//             navigation.navigate('Login');
//         }
//     }, [registerReq.isSuccess]);

//     return (
//         <View style={styles.container}>
//             <Text> currentLanguage : {currentLanguage}</Text>
//             <Text style={styles.title}>{translation.signup}</Text>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 value={userName}
//                 onChangeText={setUserName}
//             />

//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={Email}
//                 onChangeText={setEmail}
//             />

//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 value={Password}
//                 onChangeText={setPassword}
//             />

//             {/* <Button title="Switch to English" onPress={() => setCurrentLanguage('en')} />
//       <Button title="Switch to Amharic" onPress={() => setCurrentLanguage('am')} />  */}

//             <View
//                 style={{
//                     marginTop: 30,
//                     marginBottom: 30,
//                     paddingVertical: 30,
//                 }}
//             >
//                 <CustomButton
//                     title="To English"
//                     onPress={() => {
//                         setCurrentLanguage('en');
//                         setShowAlertToEnglish(true);
//                     }}
//                 />
//                 {ShowAlertToEnglish && (
//                     <CustomAlert
//                         title="ቋንቋው"
//                         description="ቋንቋው በተሳካ ሁኔታ ተቀይሯል"
//                         alertType="info"
//                     />
//                 )}

//                 <CustomButton
//                     title="To Amaric"
//                     onPress={() => {
//                         setCurrentLanguage('am');
//                         setShowAlertTOAmaric(true);
//                     }}
//                 />
//                 {ShowAlertTOAmaric && (
//                     <CustomAlert
//                         title="The Language"
//                         description="The language is chnaged Successfully"
//                         alertType="success"
//                     />
//                 )}
//             </View>

//             {registerReq.isLoading ? (
//                 <ActivityIndicator
//                     size="large"
//                     color="blue"
//                     style={{ marginVertical: 20 }}
//                 />
//             ) : (
//                 <CustomButton
//                     title="Register"
//                     onPress={RegisterUser}
//                     disabled={!allFilled}
//                 />
//             )}

//             {registerReq.isError && (
//                 <Text style={styles.errorText}>{registerReq.errorMessage}</Text>
//             )}
//         </View>
//     );
// };

// export default Register;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 15,
//         borderRadius: 8,
//     },
//     errorText: {
//         color: 'red',
//         marginTop: 10,
//         textAlign: 'center',
//     },
// });
