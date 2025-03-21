import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/app';

type CarpentryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'carpentry'>;

const CarpentryScreen: React.FC = () => {
  const navigation = useNavigation<CarpentryScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carpentry Tools and Techniques</Text>
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to the Carpentry section!</Text>
        <Text style={styles.text}>Here you'll learn about:</Text>
        <Text style={styles.listItem}>• Woodworking tools</Text>
        <Text style={styles.listItem}>• Basic techniques</Text>
        <Text style={styles.listItem}>• Safety measures</Text>
        <Text style={styles.listItem}>• Project planning</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 18,
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default CarpentryScreen;