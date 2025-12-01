import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function RootNavigator() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(usr => {
      setUser(usr);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
