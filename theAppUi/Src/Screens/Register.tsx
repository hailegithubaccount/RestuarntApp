import 'react-native-get-random-values';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRegister } from '../Hooks/auth';
import * as Yup from 'yup';
import { utils, getPublicKey } from '@noble/secp256k1';
import { Buffer } from 'buffer';
import { useTranslationStore } from '../store/translationStore';
import CustomButton from '../Components/Button';
import CustomAlert from '../Components/Alert';

const Register = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [ShowAlertTOAmaric, setShowAlertTOAmaric] = useState(false);
  const [ShowAlertToEnglish, setShowAlertToEnglish] = useState(false);

  const { mutate: registerUser, isPending: isLoading } = useRegister({
    onSuccess: (data: any) => {
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login');
    },
    onError: (err: any) => {
      const message = err?.error?.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  });

  const allFilled = userName && Email && Password;

  const translation = useTranslationStore(state => state.translation);
  const currentLanguage = useTranslationStore(state => state.currentLanguage);
  const setCurrentLanguage = useTranslationStore(
    state => state.setCurrentLanguage,
  );

  let validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    Email: Yup.string().email('Invalid email').required('Email is required'),
    Password: Yup.string().required('Password is required'),
  });

  // Server private key (for demo only)
  const serverPrivateKey = utils.randomSecretKey();

  // Server public key (uncompressed, 65 bytes)
  const publicKey = getPublicKey(serverPrivateKey);

  const RegisterUser = async () => {
    try {
      await validationSchema.validate(
        { userName, Email, Password },
        { abortEarly: false },
      );

      const data = {
        username: userName.toLowerCase(),
        email: Email.toLowerCase(),
        password: Password,
      };

      registerUser(data);
    } catch (err: any) {
      if (err.inner) {
        const messages = err.inner.map((e: any) => e.message).join('\n');
        Alert.alert('Validation Error', messages);
      } else {
        console.error(err);
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text> currentLanguage : {currentLanguage}</Text>
      <Text style={styles.title}>{translation.signup}</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={Email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={Password}
        onChangeText={setPassword}
      />

      <View
        style={{
          marginTop: 30,
          marginBottom: 30,
          paddingVertical: 30,
        }}
      >
        <CustomButton
          title="To English"
          onPress={() => {
            setCurrentLanguage('en');
            setShowAlertToEnglish(true);
          }}
        />
        {ShowAlertToEnglish && (
          <CustomAlert
            title="ቋንቋው"
            description="ቋንቋው በተሳካ ሁኔታ ተቀይሯል"
            alertType="info"
          />
        )}

        <CustomButton
          title="To Amaric"
          onPress={() => {
            setCurrentLanguage('am');
            setShowAlertTOAmaric(true);
          }}
        />
        {ShowAlertTOAmaric && (
          <CustomAlert
            title="The Language"
            description="The language is chnaged Successfully"
            alertType="success"
          />
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ marginVertical: 20 }}
        />
      ) : (
        <CustomButton
          title="Register"
          onPress={RegisterUser}
          disabled={!allFilled}
        />
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
