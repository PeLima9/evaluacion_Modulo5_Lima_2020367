import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../utils/auth';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    specialty: ''
  });

  const handleRegister = async () => {
    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.specialty) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const result = await registerUser(formData);
    if (result.success) {
      Alert.alert('Éxito', 'Cuenta creada exitosamente');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={formData.name}
        onChangeText={(text) => updateField('name', text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={formData.email}
        onChangeText={(text) => updateField('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(text) => updateField('password', text)}
        secureTextEntry
      />
      
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={formData.age}
        onChangeText={(text) => updateField('age', text)}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={formData.specialty}
        onChangeText={(text) => updateField('specialty', text)}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa'
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
  linkText: {
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 16
  }
});