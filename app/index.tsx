import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import strings from '../utils/strings'; // Tu sistema de multilanguage

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latero</Text>
      <Text style={styles.subtitle}>{strings.splashSubtitle}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/create')}>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    textAlign: 'center',
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
