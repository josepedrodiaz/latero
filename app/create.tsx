import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import strings from '../utils/strings';

export default function CreateMessage() {
  const router = useRouter();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [date, setDate] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const [showPicker, setShowPicker] = useState(false);

  // Permissions
  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordedUri(uri ?? null);
    setRecording(null);
    console.log('Recording stopped and stored at', uri);
  };

  const playRecording = async () => {
    if (!recordedUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
    setSound(sound);
    await sound.playAsync();
  };

  const scheduleNotification = async () => {
    if (!recordedUri) {
      alert('Please record a reminder first!');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Latero Voice Reminder 🎙️",
        body: "Tap to listen to your reminder.",
        sound: true,
      },
      trigger: date,
    });

    router.replace('/'); // back to home
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.newReminder}</Text>

      {recording ? (
        <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
          <Text style={styles.recordButtonText}>🛑 Stop Recording</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Text style={styles.recordButtonText}>🎙️ Start Recording</Text>
        </TouchableOpacity>
      )}

      {recordedUri && (
        <>
          <TouchableOpacity style={styles.playButton} onPress={playRecording}>
            <Text style={styles.playButtonText}>▶️ Play Recording</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
            <Text style={styles.recordButtonText}>🔄 Re-record</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={{ marginVertical: 20 }}>
        <Button title="Pick date and time" onPress={() => setShowPicker(true)} />
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Schedule Voice Reminder" onPress={scheduleNotification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 20,
    textAlign: 'center',
  },
  recordButton: {
    backgroundColor: '#4F8EF7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#34D399',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
