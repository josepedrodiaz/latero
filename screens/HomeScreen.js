import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import strings from '../utils/strings';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.myReminders}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateMessage')}>
        <Text style={styles.buttonText}>{strings.newReminder}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
