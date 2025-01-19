import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  findNodeHandle,
  AccessibilityInfo,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech';
import { MaterialIcons } from '@expo/vector-icons';

interface CustomHeaderProps {
  title: string;
  onVoiceOver: (isActive: boolean) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, onVoiceOver }) => {
  const { i18n } = useTranslation();
  const [isVoiceOverActive, setIsVoiceOverActive] = useState(false);

  const toggleLanguage = (): void => {
    const newLanguage = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const toggleVoiceOver = async (): Promise<void> => {
    const newState = !isVoiceOverActive;
    setIsVoiceOverActive(newState);
    onVoiceOver(newState);

    if (newState) {
      // Start voice over for current screen content
      await Speech.speak(title, {
        language: i18n.language,
        rate: 0.8,
      });
    } else {
      await Speech.stop();
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleVoiceOver}
          accessible={true}
          accessibilityLabel={isVoiceOverActive ? "Stop voice over" : "Start voice over"}
          accessibilityRole="button"
        >
          <MaterialIcons 
            name={isVoiceOverActive ? "volume-up" : "volume-off"} 
            size={24} 
            color={isVoiceOverActive ? "#007AFF" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={toggleLanguage}
          accessible={true}
          accessibilityLabel="Change language"
          accessibilityRole="button"
        >
          <Text style={styles.languageButtonText}>
            {i18n.language === 'en' ? 'हिंदी' : 'EN'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  languageButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomHeader;