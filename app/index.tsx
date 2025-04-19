import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import strings from '../utils/strings'; // Tu sistema de multilanguage
import { Ionicons } from '@expo/vector-icons';


export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latero</Text>
      <Text style={styles.subtitle}>{strings.splashSubtitle}</Text>

      <TouchableOpacity style={styles.fabButton} onPress={() => router.push('/create')}>
        <Ionicons name="add" size={36} color="white" />
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
  fabButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#1E40AF',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // para sombra en Android
    shadowColor: '#000', // para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
});
