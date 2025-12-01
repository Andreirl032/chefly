import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FeedScreen from '../screens/App/FeedScreen.tsx';
// import RecipeDetailsScreen from '../screens/App/RecipeDetailsScreen.tsx';
// import FavoritesScreen from '../screens/App/FavoritesScreen.tsx';
// import OfflineSavedScreen from '../screens/App/OfflineSavedScreen.tsx';
// import ProfileScreen from '../screens/App/ProfileScreen.tsx';
import DrawerNavigator from './DrawerNavigator.tsx';
import RecipeDetailsScreen from '../screens/App/RecipeDetailsScreen.tsx';
import { RootStackParamList } from '../types/Navigation.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: '#FF7A00' },
        // headerTintColor: '#fff',
        // headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Recipe" component={RecipeDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Offline Saved" component={OfflineSavedScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen name="AppDrawer" component={DrawerNavigator} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}
