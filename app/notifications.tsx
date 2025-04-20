import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadReminders() {
        try {
          const remindersString = await AsyncStorage.getItem('reminders');
          console.log('Contenido en AsyncStorage:', remindersString);
          const remindersArray = remindersString ? JSON.parse(remindersString) : [];
          console.log('Array parseado:', remindersArray);
          setReminders(remindersArray);
        } catch (error) {
          console.error('Failed to load reminders:', error);
        }
      }

      loadReminders();
    }, [])
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Scheduled Reminders</Text>

        {reminders.length === 0 ? (
          <View style={styles.placeholder}>
            <Ionicons name="notifications-off-outline" size={64} color="#9CA3AF" />
            <Text style={styles.placeholderText}>No reminders scheduled yet.</Text>
          </View>
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.reminderItem}>
                <Ionicons name="calendar-outline" size={24} color="#1E40AF" style={{ marginRight: 10 }} />
                <Text style={styles.reminderText}>
                  {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  placeholderText: {
    color: '#D1D5DB',
    fontSize: 16,
    marginTop: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  reminderText: {
    fontSize: 16,
    color: '#1F2937',
  },
  backButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
