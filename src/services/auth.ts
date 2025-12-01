import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/Navigation';

type LoginNav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export async function loginWithGoogle(navigation: LoginNav) {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();

    if (!idToken) {
      throw new Error("Google sign-in didn't return an idToken");
    }

    // Creates credential and logs into firebase
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const result = await auth().signInWithCredential(googleCredential);
    const user = result.user;

    // Verifies if the profile is already at firestore
    const doc = await firestore().collection('users').doc(user.uid).get();
    if (!doc.exists) {
      navigation.navigate('CompleteProfile', {
        uid: user.uid,
        email: user.email,
        name: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      });
    }
  } catch (error: any) {
    console.log('Google Sign-In Error:', error.message);
  }
}
