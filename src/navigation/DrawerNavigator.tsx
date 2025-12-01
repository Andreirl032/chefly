// src/navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FeedScreen from '../screens/App/FeedScreen';
import FavoritesScreen from '../screens/App/FavoritesScreen';
import OfflineScreen from '../screens/App/OfflineSavedScreen';
import ProfileScreen from '../screens/App/ProfileScreen';
import SettingsScreen from '../screens/App/SettingsScreen';
import MaterialIcons from '@react-native-vector-icons/material-icons';


const Drawer = createDrawerNavigator();

const createIcon =
  (name: any) =>
  ({ color, size }: { color: string; size: number }) =>
    <MaterialIcons name={name} size={size} color={color} />;

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#FF7F50',
        drawerLabelStyle: { fontSize: 16 },
        headerStyle: { backgroundColor: '#FF7A00' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={FeedScreen}
        options={{
          title: 'Feed',
          drawerIcon: createIcon("restaurant-menu"),
        }}
      />

      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          drawerIcon: createIcon("favorite"),
        }}
      />

      <Drawer.Screen
        name="Offline"
        component={OfflineScreen}
        options={{
          title: 'Offline',
          drawerIcon: createIcon("cloud-off"),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: createIcon("person"),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: createIcon("settings"),
        }}
      />
    </Drawer.Navigator>
  );
}
