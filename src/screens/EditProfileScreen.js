import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebase';
import { getUserData, updateUserData } from '../utils/auth';

export default function EditProfileScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    specialty: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (auth.currentUser) {
      const result = await getUserData(auth.currentUser.uid);
      if (result.success) {
        setFormData({
          name: result.data.name,
          age: result.data.age.toString(),
          specialty: result.data.specialty
        });
      }
    }
  };

  const handleUpdate = async () => {
    // Validate all fields are filled
    if (!formData.name || !formData.age || !formData.specialty) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const result = await updateUserData(auth.currentUser.uid, {
      name: formData.name,
      age: formData.age,
      specialty: formData.specialty
    });
    
    if (result.success) {
      Alert.alert('Éxito', 'Perfil actualizado exitosamente');
      navigation.goBack();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={formData.name}
        onChangeText={(text) => updateField('name', text)}
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
      
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar Perfil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.cancelButton]} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
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
  cancelButton: {
    backgroundColor: '#6c757d'
  }
});