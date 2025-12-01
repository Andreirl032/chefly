import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '707033624164-ad6dut0ekl643abhnrv4c31ps8ugqctv.apps.googleusercontent.com',
});

export default function App() {
  return <RootNavigator />;
}
