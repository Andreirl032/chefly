import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { logout } from '../services/logout';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <View style={styles.content}>
        <MaterialIcons
          name="logout"
          size={20}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.text}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff8c42',
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: { marginRight: 8 },
});
