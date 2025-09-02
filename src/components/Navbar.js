import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Navbar({ currentScreen, navigate }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'Home' && styles.activeNavItem]}
        onPress={() => navigate('Home')}
      >
        <Text style={[styles.navText, currentScreen === 'Home' && styles.activeNavText]}>
          Inicio
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'EditProfile' && styles.activeNavItem]}
        onPress={() => navigate('EditProfile')}
      >
        <Text style={[styles.navText, currentScreen === 'EditProfile' && styles.activeNavText]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8
  },
  activeNavItem: {
    backgroundColor: '#007AFF'
  },
  navText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500'
  },
  activeNavText: {
    color: '#ffffff',
    fontWeight: '600'
  }
});

//Comment.