import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/app';

type MasonryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'masonry'>;

const MasonryScreen: React.FC = () => {
  const navigation = useNavigation<MasonryScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masonry Skills and Materials</Text>
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to the Masonry section!</Text>
        <Text style={styles.text}>You'll learn about:</Text>
        <Text style={styles.listItem}>• Types of bricks and stones</Text>
        <Text style={styles.listItem}>• Mortar mixing</Text>
        <Text style={styles.listItem}>• Construction techniques</Text>
        <Text style={styles.listItem}>• Safety protocols</Text>
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

export default MasonryScreen;