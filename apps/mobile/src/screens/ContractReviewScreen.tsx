import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import type { ContractCheckResult, ApiResponse } from '@lexhub/api-client/types';
import { checkContractAI } from '@lexhub/api-client/api';

const ContractReviewScreen: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<ContractCheckResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheck = async () => {
    if (!text.trim()) {
      Alert.alert('שגיאה', 'אנא הדביקי את טקסט החוזה לפני הבדיקה');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response: ApiResponse<ContractCheckResult> = await checkContractAI(
        text,
      );
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        Alert.alert('שגיאה', response.error ?? 'בדיקת החוזה נכשלה');
      }
    } catch (error) {
      Alert.alert('שגיאה', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOrSend = () => {
    // TODO: לחבר לשמירה / שליחה לעו״ד מצד השרת
    Alert.alert('הצלחה', 'החוזה נשמר / נשלח לעו״ד (דמו).');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>בדיקת חוזה חכמה</Text>
        <TextInput
          style={styles.textarea}
          placeholder="הדביקי כאן את טקסט החוזה"
          value={text}
          multiline
          onChangeText={setText}
        />
        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <Button title="בדיקת חוזה" onPress={handleCheck} />
        )}
      </View>

      {result && (
        <View style={styles.card}>
          <Text style={styles.subtitle}>סיכום החוזה</Text>
          <Text style={styles.summaryText}>{result.summary}</Text>

          <Text style={styles.subtitle}>בעיות אפשריות</Text>
          {result.issues.map((issue) => (
            <Text key={issue} style={styles.issueItem}>
              • {issue}
            </Text>
          ))}

          <Button
            title="שמור / שלחי לעו״ד"
            onPress={handleSaveOrSend}
            color="#198754"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ContractReviewScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  summaryText: {
    marginBottom: 8,
    lineHeight: 20,
  },
  issueItem: {
    marginBottom: 4,
  },
  loader: {
    marginTop: 8,
  },
});

