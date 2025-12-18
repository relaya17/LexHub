import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import type {
  LetterType as ApiLetterType,
  LetterForm,
  HandlerType,
} from '@lexhub/api-client/types';
import { createLetter } from '@lexhub/api-client/api';

const QUESTIONS: string[] = [
  'מה מטרת המכתב?',
  'מי הנמען?',
  'מה הפרטים החשובים?',
  'מה התוצאה הרצויה?',
];

type UiLetterType = 'חובות' | 'משפחה' | 'דיור' | 'עבודה' | 'צרכנות' | 'כללי';

const uiLetterTypes: UiLetterType[] = [
  'חובות',
  'משפחה',
  'דיור',
  'עבודה',
  'צרכנות',
  'כללי',
];

const mapUiTypeToApiType = (uiType: UiLetterType): ApiLetterType => {
  switch (uiType) {
    case 'חובות':
      return 'debt';
    case 'משפחה':
      return 'family';
    case 'דיור':
      return 'work'; // ניתן לשנות בהתאם להגדרה מדויקת יותר
    case 'עבודה':
      return 'work';
    case 'צרכנות':
      return 'consumer' as ApiLetterType;
    case 'כללי':
    default:
      return 'general';
  }
};

const buildLetterForm = (answers: string[], uiType: UiLetterType): LetterForm => {
  const [goal, recipient, details, result] = answers;
  const subject =
    goal && goal.trim().length > 0 ? goal : `מכתב בנושא ${uiType || 'כללי'}`;
  const extraDetails = [recipient, details, result]
    .filter((part) => part && part.trim().length > 0)
    .join(' | ');

  return {
    fullName: 'לקוח לא מזוהה', // בעתיד: מתוך פרופיל / Auth
    subject,
    details: extraDetails || subject,
  };
};

const WriteLetterScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<UiLetterType | null>(null);
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(''));
  const [draft, setDraft] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const goToQuestions = () => {
    if (!selectedType) {
      Alert.alert('שגיאה', 'בחרי סוג מכתב לפני המשך');
      return;
    }
    setStep(2);
  };

  const buildDraft = () => {
    if (!selectedType) return;
    const text =
      `מכתב בנושא ${selectedType}\n\n` +
      answers
        .map((answer, index) => `${QUESTIONS[index]}: ${answer}`)
        .join('\n');
    setDraft(text);
    setStep(3);
  };

  const sendLetter = async (handler: HandlerType) => {
    if (!selectedType) {
      Alert.alert('שגיאה', 'בחרי סוג מכתב לפני שליחה');
      return;
    }
    setLoading(true);
    try {
      const apiType = mapUiTypeToApiType(selectedType);
      const form = buildLetterForm(answers, selectedType);
      const response = await createLetter(apiType, form, handler);
      if (!response.success || !response.data) {
        Alert.alert('שגיאה', response.error ?? 'שליחת המכתב נכשלה');
        return;
      }
      Alert.alert(
        'הצלחה',
        handler === 'ai'
          ? 'המכתב נשלח ל-AI ונשמר כטיוטה במערכת'
          : 'המכתב נשלח לעו״ד ונשמר במערכת',
      );
      setStep(1);
      setSelectedType(null);
      setAnswers(Array(QUESTIONS.length).fill(''));
      setDraft('');
    } catch (error) {
      Alert.alert('שגיאה', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>כתיבת מכתב משפטי</Text>

      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.label}>בחרי סוג מכתב</Text>
          <View style={styles.typeContainer}>
            {uiLetterTypes.map((lt) => (
              <View key={lt} style={styles.typeButtonWrapper}>
                <Button
                  title={lt}
                  onPress={() => setSelectedType(lt)}
                  color={lt === selectedType ? '#0d6efd' : '#6c757d'}
                />
              </View>
            ))}
          </View>
          <Button title="המשך לשאלות" onPress={goToQuestions} disabled={!selectedType} />
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.label}>עני על כמה שאלות קצרות</Text>
          {QUESTIONS.map((q, index) => (
            <View key={q} style={styles.questionGroup}>
              <Text style={styles.questionLabel}>{q}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="כתבי כאן את התשובה"
                value={answers[index]}
                onChangeText={(value) => handleAnswerChange(index, value)}
                multiline
              />
            </View>
          ))}
          <Button title="צפי בטיוטה" onPress={buildDraft} />
        </View>
      )}

      {step === 3 && draft !== '' && (
        <View style={styles.card}>
          <Text style={styles.label}>טיוטת המכתב שלך</Text>
          <Text style={styles.draftText}>{draft}</Text>
          {loading ? (
            <ActivityIndicator style={styles.loader} />
          ) : (
            <View style={styles.actionsRow}>
              <Button title="שליחה עם AI" onPress={() => void sendLetter('ai')} />
              <View style={styles.spacer} />
              <Button
                title="שליחה לעו״ד"
                onPress={() => void sendLetter('lawyer')}
                color="#198754"
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default WriteLetterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  typeButtonWrapper: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  questionGroup: {
    marginBottom: 12,
  },
  questionLabel: {
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'right',
  },
  draftText: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    width: 10,
    height: 10,
  },
  loader: {
    marginTop: 8,
  },
});

