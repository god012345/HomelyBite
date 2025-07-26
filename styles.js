// screens/SignupScreen.js

import React, { useState } from 'react';
import {
  View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function SignupScreen({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('⚠️ Fill all fields');
      return;
    }

    try {
      // 🔍 Check if username already exists
      const userRef = doc(db, 'users', username);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        Alert.alert('❌ Username already taken. Choose another.');
        return;
      }

      // ✅ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 📝 Save user info in Firestore
      await setDoc(userRef, {
        uid,
        email,
        username,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('✅ Account created successfully!');
    } catch (error) {
      Alert.alert('❌ Signup failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Create Account</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign Up" onPress={handleSignup} />

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30,
  },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#ccc',
    padding: 12, marginBottom: 15, borderRadius: 8,
  },
  switchText: {
    marginTop: 20, color: '#007AFF', fontWeight: 'bold',
  },
});
