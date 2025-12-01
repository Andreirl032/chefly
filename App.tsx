import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '550074208448-o0lm9q5udgqq13lv579kbdotcp08pkft.apps.googleusercontent.com',
});

export default function App() {
  return <RootNavigator />;
}
