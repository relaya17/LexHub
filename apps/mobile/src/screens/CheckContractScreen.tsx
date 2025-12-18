import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const CheckContractScreen: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (result.type === 'success') {
      setFileName(result.name);
    }
  };

  const handleCheck = () => {
    if (fileName) {
      // eslint-disable-next-line no-alert
      alert(`החוזה ${fileName} נבדק ע״י AI!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בדיקת חוזה חכמה</Text>
      <Button title="בחר קובץ" onPress={pickFile} />
      {fileName && <Text style={styles.fileName}>{fileName}</Text>}
      <Button title="בדוק חוזה" onPress={handleCheck} disabled={!fileName} />
    </View>
  );
};

export default CheckContractScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  fileName: { marginVertical: 10, textAlign: 'center' },
});


