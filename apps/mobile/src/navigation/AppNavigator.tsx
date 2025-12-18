import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WriteLetterScreen from '../screens/WriteLetterScreen';
import ContractReviewScreen from '../screens/ContractReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import LawyersSwipeScreen from '../screens/LawyersSwipeScreen';
import LawyerProfileScreen from '../screens/LawyerProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  WriteLetter: undefined;
  ContractReview: undefined;
  Profile: undefined;
  Chat: undefined;
  Lawyers: undefined;
  LawyerProfile: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'LexHub' }} />
      <Stack.Screen
        name="WriteLetter"
        component={WriteLetterScreen}
        options={{ title: 'כתיבת מכתב' }}
      />
      <Stack.Screen
        name="ContractReview"
        component={ContractReviewScreen}
        options={{ title: 'בדיקת חוזה' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'פרופיל' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'צ׳אט' }}
      />
      <Stack.Screen
        name="Lawyers"
        component={LawyersSwipeScreen}
        options={{ title: 'מציאת עו״ד' }}
      />
      <Stack.Screen
        name="LawyerProfile"
        component={LawyerProfileScreen}
        options={{ title: 'פרופיל עו״ד' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

