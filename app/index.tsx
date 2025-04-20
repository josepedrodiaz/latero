import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import strings from '../utils/strings';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latero</Text>
      <Text style={styles.subtitle}>{strings.splashSubtitle}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.fabButton} onPress={() => router.push('/create')}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fabButton} onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
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
  buttonsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  fabButton: {
    backgroundColor: '#1E40AF',
    padding: 15,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
});
