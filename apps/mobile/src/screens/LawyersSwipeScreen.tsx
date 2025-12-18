import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator } from 'react-native';
import type { Lawyer } from '@lexhub/api-client/types';
import { swipeLawyer } from '@lexhub/api-client/lawyers';
import { fetchMatchingLawyers } from '@lexhub/api-client/matching';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Lawyers'>;

const LawyersSwipeScreen: React.FC<Props> = ({ navigation }) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMatchingLawyers({});
        setLawyers(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load lawyers', error);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const handleSwipe = async (liked: boolean) => {
    const lawyer = lawyers[currentIndex];
    if (!lawyer) return;
    try {
      await swipeLawyer(lawyer.id, liked);
      setCurrentIndex((prev) => prev + 1);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Failed to save swipe');
    }
  };

  if (loading && lawyers.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (currentIndex >= lawyers.length) {
    return (
      <View style={styles.centered}>
        <Text>אין עוד עורכי דין להצגה</Text>
      </View>
    );
  }

  const lawyer = lawyers[currentIndex];

  return (
    <View style={styles.container}>
      <Image source={{ uri: lawyer.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{lawyer.name}</Text>
      <Text>{lawyer.specialties.join(', ')}</Text>
      <Text>
        טווח מחיר: ₪{lawyer.priceRange.min} - ₪{lawyer.priceRange.max}
      </Text>
      <Text>דירוג: {lawyer.rating.toFixed(1)} ⭐</Text>
      <View style={styles.buttons}>
        <Button title="לא מעוניינת" color="red" onPress={() => void handleSwipe(false)} />
        <Button title="מתעניינת" color="green" onPress={() => void handleSwipe(true)} />
      </View>
      <View style={styles.moreButton}>
        <Button
          title="פרטים נוספים"
          onPress={() => navigation.navigate('LawyerProfile', { id: lawyer.id })}
        />
      </View>
    </View>
  );
};

export default LawyersSwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  moreButton: {
    marginTop: 16,
  },
});


