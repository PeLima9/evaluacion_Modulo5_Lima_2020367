import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebase';
import { getUserData, logoutUser } from '../utils/auth';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (auth.currentUser) {
      const result = await getUserData(auth.currentUser.uid);
      if (result.success) {
        setUserData(result.data);
      }
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      Alert.alert('Éxito', 'Sesión cerrada exitosamente');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>
      
      {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.welcome}>¡Bienvenido, {userData.name}!</Text>
          <Text style={styles.info}>Correo: {userData.email}</Text>
          <Text style={styles.info}>Edad: {userData.age} años</Text>
          <Text style={styles.info}>Especialidad: {userData.specialty}</Text>
        </View>
      )}
      
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333'
  },
  userInfo: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007AFF',
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: '#dc3545'
  }
});