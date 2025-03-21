import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AccessibilityInfo,
  Image,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Define types for navigation
type RootStackParamList = {
  Home: undefined;
  carpentry: undefined;
  masonry: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

// Define types for translations
interface TranslationKeys {
  carpentry: string;
  masonry: string;
  selectLanguage: string;
  carpentryDescription: string;
  masonryDescription: string;
  chooseOption: string;
}

// Properly type the resources for i18next
type Resources = {
  [key: string]: {
    translation: TranslationKeys;
  };
};

// Initialize i18n with typed resources
const resources: Resources = {
  en: {
    translation: {
      carpentry: 'Carpentry',
      masonry: 'Masonry',
      selectLanguage: 'Select Language',
      chooseOption: 'What would you like to work on?',
      carpentryDescription: 'Select this for woodworking and furniture making',
      masonryDescription: 'Select this for brick, stone, and concrete work',
    },
  },
  hi: {
    translation: {
      carpentry: 'बढ़ईगीरी',
      masonry: 'राजमिस्त्री का काम',
      selectLanguage: 'भाषा चुनें',
      chooseOption: 'आप किस पर काम करना चाहेंगे?',
      carpentryDescription: 'लकड़ी का काम और फर्नीचर बनाने के लिए यह चुनें',
      masonryDescription: 'ईंट, पत्थर और कंक्रीट के काम के लिए यह चुनें',
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

interface OptionCardProps {
  title: keyof TranslationKeys;
  description: string;
  image: ImageSourcePropType;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();
  const [highlightedOption, setHighlightedOption] = useState<string | null>(null);

  const speakText = async (text: string): Promise<void> => {
    const currentLanguage = i18n.language;
    await Speech.speak(text, {
      language: currentLanguage,
      rate: 0.8,
      onStart: () => setHighlightedOption(text),
      onDone: () => setHighlightedOption(null),
    });
  };

  const OptionCard: React.FC<OptionCardProps> = ({ title, description, image }) => (
    <TouchableOpacity
      style={[
        styles.card,
        highlightedOption === title && styles.highlightedCard,
      ]}
      onPress={() => {
        speakText(description);
        // Navigate to the respective screen after voice prompt
        setTimeout(() => {
          navigation.navigate(title as keyof RootStackParamList);
        }, 2000);
      }}
      accessible={true}
      accessibilityLabel={description}
      accessibilityRole="button">
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{t(title)}</Text>
    </TouchableOpacity>
  );

  const toggleLanguage = (): void => {
    const newLanguage = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={toggleLanguage}
        accessible={true}
        accessibilityLabel={t('selectLanguage')}
        accessibilityRole="button">
        <Text style={styles.languageButtonText}>
          {i18n.language === 'en' ? 'हिंदी' : 'English'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.titleText}>{t('chooseOption')}</Text>
      <View style={styles.cardsContainer}>
        <OptionCard
          title="carpentry"
          description={t('carpentryDescription')}
          image={require('../assets/images/icon.png')}
        />
        <OptionCard
          title="masonry"
          description={t('masonryDescription')}
          image={require('../assets/images/icon.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  languageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    zIndex: 1,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  highlightedCard: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  cardImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;