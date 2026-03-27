import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRegister } from '../Hooks/auth';
import * as Yup from 'yup';
import { useTranslationStore } from '../store/translationStore';
import CustomAlert from '../Components/Alert';

const Register = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [showAlert, setShowAlert] = useState<{ show: boolean, title: string, description: string, type: 'info' | 'success' }>({
    show: false,
    title: '',
    description: '',
    type: 'info'
  });

  const translation = useTranslationStore(state => state.translation);
  const currentLanguage = useTranslationStore(state => state.currentLanguage);
  const setCurrentLanguage = useTranslationStore(state => state.setCurrentLanguage);



  const register = useRegister();

  const allFilled = userName && Email && Password;

  const validationSchema = Yup.object().shape({
    userName: Yup.string().trim().required('Username is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleRegister = async () => {
    try {
      await validationSchema.validate(
        { userName, email: Email, password: Password },
        { abortEarly: false }
      );

      const payload = {
        username: userName.trim().toLowerCase(),
        email: Email.trim().toLowerCase(),
        password: Password,
      };

      register.mutate(payload, {
        onSuccess: () => {
          Alert.alert('Success', 'Registration successful! Please login.');
          navigation.navigate('Login');
        },

        onError: (err: any) => {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            'Registration failed. Please try again.';

          Alert.alert('Error', message);
        },
      });

    } catch (err: any) {
      if (err.inner && Array.isArray(err.inner)) {
        const messages = err.inner.map((e: any) => e.message).join('\n');
        Alert.alert('Validation Error', messages);
      } else {
        Alert.alert('Error', err.message || 'Something went wrong');
      }
    }
  };





  const changeLanguage = (lang: 'en' | 'am') => {
    setCurrentLanguage(lang);
    setShowAlert({
      show: true,
      title: lang === 'en' ? 'Language Changed' : 'ቋንቋው ተቀይሯል',
      description: lang === 'en' ? 'App is now in English' : 'መተግበሪያው አሁን በአማርኛ ነው',
      type: lang === 'en' ? 'info' : 'success'
    });
    setTimeout(() => setShowAlert({ ...showAlert, show: false }), 3000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.langSwitcher}>
            <TouchableOpacity
              style={[styles.langBtn, currentLanguage === 'en' && styles.activeLang]}
              onPress={() => changeLanguage('en')}
            >
              <Text style={[styles.langText, currentLanguage === 'en' && styles.activeLangText]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, currentLanguage === 'am' && styles.activeLang]}
              onPress={() => changeLanguage('am')}
            >
              <Text style={[styles.langText, currentLanguage === 'am' && styles.activeLangText]}>አማርኛ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.title}>{translation.signup || 'Create Account'}</Text>
            <Text style={styles.subtitle}>Join our coffee community today</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#666"
              value={userName}
              onChangeText={setUserName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={Email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry
              value={Password}
              onChangeText={setPassword}
            />

            {register.isPending ? (
              <ActivityIndicator size="large" color="orange" style={{ marginVertical: 20 }} />
            ) : (
              <TouchableOpacity
                style={[styles.registerBtn, !allFilled && { opacity: 0.6 }]}
                onPress={handleRegister}
                disabled={!allFilled}
              >
                <Text style={styles.registerBtnText}>Register</Text>
              </TouchableOpacity>
            )}


            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {showAlert.show && (
            <View style={styles.alertWrapper}>
              <CustomAlert
                title={showAlert.title}
                description={showAlert.description}
                alertType={showAlert.type}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  langSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  langBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#252A32',
    borderWidth: 1,
    borderColor: '#333',
  },
  activeLang: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  langText: {
    color: '#AEB2B7',
    fontSize: 12,
    fontWeight: '600',
  },
  activeLangText: {
    color: 'white',
  },
  formCard: {
    backgroundColor: '#252A32',
    padding: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
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
  registerBtn: {
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
  registerBtnText: {
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
  alertWrapper: {
    marginTop: 20,
    alignItems: 'center',
  }
});
