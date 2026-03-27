import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLogin } from '../Hooks/auth';
import { useUserStore } from '../store/userStore';
import { useTranslationStore } from '../store/translationStore';

const Login = ({ navigation, route }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore(state => state.setUser);
  const translation = useTranslationStore(state => state.translation);

  const fromScreen = route.params?.fromScreen || 'TabNavigatort';



  const login = useLogin();


  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    login.mutate(payload, {
      onSuccess: (data: any) => {
        setUser(data?.user);

        Alert.alert('Success', 'Login successful');

        if (fromScreen === 'Bag') {
          navigation.navigate('Bag');
        } else {
          navigation.navigate('TabNavigatort', { screen: 'Home' }); 
        }
      },

      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Invalid email or password';

        Alert.alert('Login Failed', message);
      },
    });
  };












  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formCard}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your coffee experience</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />


        {login.isPending ? (
          <ActivityIndicator size="large" color="orange" style={{ marginVertical: 20 }} />
        ) : (
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        )}


        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => navigation.navigate('TabNavigatort', { screen: 'Home' })}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    justifyContent: 'center',
    padding: 20,
  },
  formCard: {
    backgroundColor: '#252A32',
    padding: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#AEB2B7',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#0C0F14',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    color: 'white',
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: 'orange',
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: 'orange',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#AEB2B7',
  },
  link: {
    color: 'orange',
    fontWeight: 'bold',
  },
  skipBtn: {
    marginTop: 30,
    alignSelf: 'center',
  },
  skipText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});