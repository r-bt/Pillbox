import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ref, getDatabase, set } from 'firebase/database';
import { useList, useObject } from 'react-firebase-hooks/database';
import app from './firebase'

const database = getDatabase(app);

export default function App() {
  const [snapshot, loading, error] = useObject(ref(database, 'status'));

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  const values = snapshot.val()

  const now = new Date();
  now.setHours(0,0,0,0)
  const dayIndex = now.getDay()
  
  return (
    <View style={styles.main}>
      <Text style={styles.header}>{now.toLocaleString('en-us', {  weekday: 'long' })}</Text>
      <View style={styles.container}>
         {values && values[dayIndex] >= now.getTime() ? (
          <>
            <Text style={styles.opened}>Pills were taken today</Text>
            <Text style={styles.time}>The pill box was opened at {new Date(values[dayIndex]).toLocaleTimeString()}</Text>
          </>      
         ) : (
          <Text style={styles.unopened}>Pills yet to be taken</Text>
         )}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    paddingTop: '20%',
  },
  header: {
    textAlign: 'center',
    fontSize: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unopened: {
    color: 'red',
    fontSize: 25,
  },
  opened: {
    color: 'green',
    fontSize: 25,
  },
  time: {
    fontSize: 20,
    paddingTop: '5%'
  }
});
