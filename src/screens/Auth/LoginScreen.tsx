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

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
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
