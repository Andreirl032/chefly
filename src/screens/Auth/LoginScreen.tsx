import React, { useState } from 'react';
import {
  //   View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../types/Navigation';
import { loginWithGoogle } from '../../services/auth';
import { StatusBar } from 'react-native';

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  <TouchableOpacity onPress={() => loginWithGoogle(navigation)}>
    <Text>Continue com Google</Text>
  </TouchableOpacity>;

  const login = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      Alert.alert('Login error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.label}>E-mail</Text>
<TextInput
  style={styles.input}
  placeholder="Digite seu e-mail"
  placeholderTextColor="#aaa"
  autoCapitalize="none"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
/>

<Text style={styles.label}>Senha</Text>
<TextInput
  style={styles.input}
  placeholder="Digite sua senha"
  placeholderTextColor="#aaa"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
/>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => loginWithGoogle(navigation)}
      >
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
  fontWeight: '600',
  color: '#000',
  marginBottom: 6,
  marginTop: 3,
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
  color: '#000',
},
  button: {
    backgroundColor: '#FF7F50',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: 'bold' },
  googleButton: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  googleText: { textAlign: 'center', fontWeight: '600' },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FF7F50',
    fontWeight: '600',
  },
});
