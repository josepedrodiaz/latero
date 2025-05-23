import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import strings from '../utils/strings';

const initialDate = new Date(Date.now() + 5 * 60 * 1000);

export default function CreateMessage() {
  const router = useRouter();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [date, setDate] = useState(initialDate);
  const [pickerMode, setPickerMode] = useState<'date' | 'time' | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  const saveReminder = async (reminder: any) => {
    try {
      const existingRemindersString = await AsyncStorage.getItem('reminders');
      const existingReminders = existingRemindersString ? JSON.parse(existingRemindersString) : [];
      existingReminders.push(reminder);
      await AsyncStorage.setItem('reminders', JSON.stringify(existingReminders));
    } catch (error) {
      console.error('Failed to save reminder:', error);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordedUri(uri ?? null);
    setRecording(null);
    setIsRecording(false);
  };

  const playRecording = async () => {
    if (!recordedUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
    setSound(sound);
    await sound.playAsync();
  };

  const cancelRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch (error) {
        console.log('Error cancelling recording', error);
      }
    }
    setRecording(null);
    setRecordedUri(null);
    setIsRecording(false);
    router.replace('/');
  };

  const scheduleNotification = async () => {
    if (!recordedUri) {
      alert('Please record a reminder first!');
      return;
    }

    const now = new Date();
    let finalDate = date;

    if (Math.abs(date.getTime() - initialDate.getTime()) < 1000) {
      finalDate = new Date(now.getTime() + 2 * 60 * 1000);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Latero Voice Reminder 🎙️",
        body: "Tap to listen to your reminder.",
        sound: true,
      },
      trigger: finalDate,
    });

    await saveReminder({
      id: Date.now(),
      uri: recordedUri,
      date: finalDate,
    });

    router.replace('/');
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'web') return;

    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      setPickerMode(null);
      return;
    }

    if (event.type === 'set') {
      if (selectedDate) {
        if (pickerMode === 'date') {
          const updatedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            date.getHours(),
            date.getMinutes()
          );
          setDate(updatedDate);
        }

        if (pickerMode === 'time') {
          const updatedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            selectedDate.getHours(),
            selectedDate.getMinutes()
          );
          setDate(updatedDate);
        }
      }
      setShowDatePicker(false);
      setPickerMode(null);
    }
  };

  function formatDateForInput(date: Date) {
    return date.toISOString().slice(0, 16);
  }

  function formatDisplayDate(date: Date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.newReminder}</Text>

      {isRecording ? (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.halfButton} onPress={stopRecording}>
            <Ionicons name="stop" size={24} color="white" />
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.halfCancelButton} onPress={cancelRecording}>
            <Ionicons name="close" size={24} color="white" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.fullWidthButton} onPress={startRecording}>
          <Ionicons name="mic" size={24} color="white" />
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      )}

      {recordedUri && (
        <>
          <TouchableOpacity style={styles.fullWidthButton} onPress={playRecording}>
            <Ionicons name="play" size={24} color="white" />
            <Text style={styles.buttonText}>Play Recording</Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.halfButton} onPress={scheduleNotification}>
              <Ionicons name="checkmark" size={24} color="white" />
              <Text style={styles.buttonText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.halfCancelButton} onPress={cancelRecording}>
              <Ionicons name="close" size={24} color="white" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={{ marginVertical: 20 }}>
        {Platform.OS !== 'web' ? (
          <>
            <TouchableOpacity style={styles.fullWidthButton} onPress={() => {
              setPickerMode('date');
              setShowDatePicker(true);
            }}>
              <Ionicons name="calendar" size={24} color="white" />
              <Text style={styles.buttonText}>Pick Date</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fullWidthButton} onPress={() => {
              setPickerMode('time');
              setShowDatePicker(true);
            }}>
              <Ionicons name="time" size={24} color="white" />
              <Text style={styles.buttonText}>Pick Time</Text>
            </TouchableOpacity>

            {showDatePicker && pickerMode && (
              <DateTimePicker
                value={date}
                mode={pickerMode}
                display="default"
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </>
        ) : (
          <View style={{ marginVertical: 10 }}>
            <input
              type="datetime-local"
              value={formatDateForInput(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
              style={{
                padding: 10,
                fontSize: 16,
                borderRadius: 8,
                border: '1px solid #CCC',
                width: '100%',
              }}
            />
          </View>
        )}
        <Text style={styles.selectedDate}>
          📅 Scheduled for: {formatDisplayDate(date)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fullWidthButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
  },
  halfButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
    gap: 10,
  },
  halfCancelButton: {
    backgroundColor: '#9CA3AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  selectedDate: {
    color: '#D1D5DB',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
