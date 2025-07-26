// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase'; // Adjust if needed

export default function HomeScreen({ navigation }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        if (!u.emailVerified) {
          Alert.alert(
            "Email Not Verified",
            "Please verify your email to access the app."
          );
          navigation.replace('Login');
        } else {
          setUser(u);
        }
      } else {
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert("Logout Failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HomelyBite! 🍲</Text>
      {user && <Text style={styles.subtitle}>Logged in as: {user.email}</Text>}

      <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40
  }
});
