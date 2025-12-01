import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { getApp } from '@react-native-firebase/app';

export default function RootNavigator() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(getApp());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
    setUser(usr);
    setLoading(false);
  });
    return ()=> unsubscribe();
  }, [auth]);

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
