import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import HomeScreen from '../screens/HomeScreen';
import CarpentryScreen from '../screens/CarpentryScreen';
import MasonryScreen from '../screens/MasonryScreen';
import CustomHeader from '../components/Header';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import './i18n/config';

// Define your screens types
export type RootStackParamList = {
  Home: undefined;
  carpentry: undefined;
  masonry: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { t } = useTranslation();

  const getScreenOptions = (title: string): NativeStackNavigationOptions => ({
    header: () => (
      <CustomHeader
        title={title}
        onVoiceOver={(isActive: boolean) => {
          // Store voice over state in navigation state or context if needed
        }}
      />
    ),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={getScreenOptions(t('chooseOption'))}
        />
        <Stack.Screen
          name="carpentry"
          component={CarpentryScreen}
          options={getScreenOptions(t('carpentry'))}
        />
        <Stack.Screen
          name="masonry"
          component={MasonryScreen}
          options={getScreenOptions(t('masonry'))}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}