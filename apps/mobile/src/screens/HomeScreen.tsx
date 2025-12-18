import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const mockLawyers = [
  { id: '1', name: 'עו״ד יוסי כהן', specialty: 'דיני עבודה', location: 'תל אביב' },
  { id: '2', name: 'עו״ד מרים לוי', specialty: 'דיני משפחה', location: 'ירושלים' },
  { id: '3', name: 'עו״ד דוד ישראלי', specialty: 'צרכנות', location: 'חיפה' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ברוכים הבאים ל-LexHub</Text>
      <Text style={styles.subtitle}>
        חיבור בין לקוחות לעורכי דין, כתיבת מכתבים ובדיקת חוזים בעזרת AI
      </Text>
      <View style={styles.buttons}>
        <Button
          title="כתוב מכתב"
          onPress={() => navigation.navigate('WriteLetter')}
        />
        <View style={styles.spacer} />
        <Button
          title="בדיקת חוזה"
          onPress={() => navigation.navigate('ContractReview')}
        />
        <View style={styles.spacer} />
        <Button title="מצא עו״ד" onPress={() => navigation.navigate('Lawyers')} />
      </View>

      <Text style={styles.sectionTitle}>עו״דים מומלצים</Text>
      {mockLawyers.map((lawyer) => (
        <View key={lawyer.id} style={styles.card}>
          <Text style={styles.cardTitle}>{lawyer.name}</Text>
          <Text>תחום התמחות: {lawyer.specialty}</Text>
          <Text>מיקום: {lawyer.location}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    width: '100%',
    marginBottom: 24,
  },
  spacer: { height: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 12,
    marginTop: 8,
  },
  card: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

