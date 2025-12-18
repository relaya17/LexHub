import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© {new Date().getFullYear()} LexHub. כל הזכויות שמורות.</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
});


