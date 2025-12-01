import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen.tsx';
import { AuthStackParamList } from '../types/Navigation.ts';
import CreateAccountScreen from '../screens/Auth/CreateAccountScreen.tsx';
import CompleteProfileScreen from '../screens/Auth/CompleteAccountScreen.tsx';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ title: 'Create Account' }}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
        options={{ title: 'Complete Account' }}
      />
    </Stack.Navigator>
  );
}
