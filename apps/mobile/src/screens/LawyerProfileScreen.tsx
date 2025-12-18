import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Lawyer } from '@lexhub/api-client/types';
import {
  getLawyer,
  favoriteLawyer,
  sendMessageToLawyer,
} from '@lexhub/api-client/lawyers';

type Props = NativeStackScreenProps<RootStackParamList, 'LawyerProfile'>;

const LawyerProfileScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getLawyer(id);
        setLawyer(data);
      } catch (error) {
        Alert.alert('שגיאה', (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const handleChat = async () => {
    if (!lawyer) return;
    try {
      await sendMessageToLawyer(
        lawyer.id,
        'שלום, אני מעוניינת בייעוץ משפטי. אשמח לפרטים נוספים.',
      );
      Alert.alert('הצלחה', 'הודעה נשלחה לעו״ד (דמו).');
    } catch (error) {
      Alert.alert('שגיאה', (error as Error).message);
    }
  };

  const handleFavorite = async () => {
    if (!lawyer) return;
    try {
      await favoriteLawyer(lawyer.id);
      setFavorited(true);
    } catch (error) {
      Alert.alert('שגיאה', (error as Error).message);
    }
  };

  const handleSendLetter = () => {
    Alert.alert('מידע', 'פתיחת כתיבת מכתב לעו״ד (דמו).');
  };

  if (loading || !lawyer) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  const publications = lawyer.publications ?? [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: lawyer.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{lawyer.name}</Text>
      <Text>{lawyer.specialties.join(', ')}</Text>
      <Text>
        טווח מחיר: ₪{lawyer.priceRange.min} - ₪{lawyer.priceRange.max}
      </Text>
      <Text>דירוג: {lawyer.rating.toFixed(1)} ⭐</Text>
      {lawyer.bio && <Text style={styles.bio}>{lawyer.bio}</Text>}
      <View style={styles.buttons}>
        <Button title="צ׳אט עם עו״ד" onPress={handleChat} />
        <Button
          title={favorited ? 'שמורה' : 'שמור'}
          onPress={handleFavorite}
          color={favorited ? '#6c757d' : '#0d6efd'}
        />
        <Button title="שלח מכתב" onPress={handleSendLetter} color="#198754" />
      </View>
      <Text style={styles.sectionTitle}>פרסומים ומאמרים</Text>
      {publications.length === 0 ? (
        <Text style={styles.pub}>עדיין אין פרסומים להצגה.</Text>
      ) : (
        publications.map((pub) => (
          <Text key={pub.title} style={styles.pub}>
            {pub.title}
          </Text>
        ))
      )}
    </ScrollView>
  );
};

export default LawyerProfileScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { alignItems: 'center', padding: 20 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  bio: { marginVertical: 8, textAlign: 'center' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  pub: { fontSize: 14, marginVertical: 2, textAlign: 'right', width: '100%' },
});


