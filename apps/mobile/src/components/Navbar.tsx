import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.brand}>LexHub</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;


