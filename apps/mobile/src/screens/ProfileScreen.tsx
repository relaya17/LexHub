import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState<string>('ישראל ישראלי');
  const [email, setEmail] = useState<string>('example@mail.com');
  const [phone, setPhone] = useState<string>('050-1234567');

  const handleSave = () => {
    // TODO: חיבור ל-API לעדכון פרופיל
    Alert.alert('הצלחה', 'השינויים נשמרו');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>פרופיל משתמש</Text>

      <Text style={styles.label}>שם מלא</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>אימייל</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>טלפון</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Button title="שמירה" onPress={handleSave} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 20, rowGap: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  label: { fontSize: 16, marginVertical: 4, textAlign: 'right' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

