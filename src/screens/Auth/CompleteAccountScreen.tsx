import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CompleteProfile'>;

export default function CompleteProfileScreen({ route, navigation }: Props) {
  const { uid, email, name: googleName, photoURL } = route.params;

  const [username, setUsername] = useState('');
  const [name, setName] = useState(googleName || '');
  const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState(''); // YYYY-MM-DD
  const [error, setError] = useState('');

  async function handleFinish() {
    setError('');

    if (!username || !name || !birthdate) {
      return setError('Fill all required fields.');
    }

    try {
      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          email,
          username,
          name,
          bio,
          birthdate,
          photoURL: photoURL || null,
          createdAt: firestore.FieldValue.serverTimestamp(),
          provider: auth().currentUser?.providerId || 'unknown',
        });

      navigation.reset({
        index: 0,
        routes: [{ name: 'AppDrawer' }],
      });
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username (@yourname)"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Birthdate (YYYY-MM-DD)"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      <TextInput
        style={styles.bioInput}
        placeholder="Bio"
        multiline
        value={bio}
        onChangeText={setBio}
      />

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff8c42',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
  bioInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    height: 100,
  },
});
