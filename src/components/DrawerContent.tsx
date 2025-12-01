import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LogoutButton from '../components/LogoutButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    paddingTop: 20,
  },
  logoutContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});
