import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

export default function CreateAccountScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  async function handleCreate() {
    setError('');

    if (!email || !password || !confirm) {
      return setError('Fill all fields.');
    }
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);

      navigation.navigate('CompleteProfile', {
        uid: res.user.uid,
        email: res.user.email || email,
      });
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>E-mail</Text>
<TextInput
  style={styles.input}
  placeholder="Digite seu e-mail"
  placeholderTextColor="#aaa"
  keyboardType="email-address"
  autoCapitalize="none"
  value={email}
  onChangeText={setEmail}
/>

<Text style={styles.label}>Password</Text>
<TextInput
  style={styles.input}
  placeholder="Digite sua senha"
  placeholderTextColor="#aaa"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
/>

<Text style={styles.label}>Confirm Password</Text>
<TextInput
  style={styles.input}
  placeholder="Confirme sua senha"
  placeholderTextColor="#aaa"
  secureTextEntry
  value={confirm}
  onChangeText={setConfirm}
/>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondary}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 3,
    color: '#000',
  },
  label: {
  fontWeight: '600',
  color: '#000',
  marginBottom: 6,
  marginTop: 8,
},
  button: {
    backgroundColor: '#ff8c42',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  secondary: { marginTop: 16, textAlign: 'center', color: '#555' },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
});
