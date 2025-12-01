import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function logout() {
  try {
    // Logs out from Firebase
    await auth().signOut();

    // If it is logged on Google, logs out as well
    const userInfo = await GoogleSignin.getCurrentUser();
    if (userInfo) {
      await GoogleSignin.signOut();
    }
  } catch (err: any) {
    console.log('Logout error:', err);
  }
}
