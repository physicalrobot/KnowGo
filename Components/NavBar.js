import React from 'react';
import styles from '../Stylesheet';

import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const NavBar = ({ onSignOut }) => {
  return (
    <SafeAreaView style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Text>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text>🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text>📅</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text>💬</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onSignOut}>
        <Text>🚪</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavBar;
