import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

import SplashScreen from '../components/SplashScreen';
import Navbar from '../components/Navbar';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('Register');

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        setCurrentScreen('Home');
      } else {
        setCurrentScreen('Register');
      }
    });
    return unsubscribe;
  }, []);

  const navigate = (screenName) => {
    setCurrentScreen(screenName);
  };

  const goBack = () => {
    setCurrentScreen('Home');
  };

  if (loading) {
    return <SplashScreen />;
  }

  const renderScreen = () => {
    const screenProps = { navigation: { navigate, goBack } };
    
    switch (currentScreen) {
      case 'Register':
        return <RegisterScreen {...screenProps} />;
      case 'Login':
        return <LoginScreen {...screenProps} />;
      case 'Home':
        return <HomeScreen {...screenProps} />;
      case 'EditProfile':
        return <EditProfileScreen {...screenProps} />;
      default:
        return <RegisterScreen {...screenProps} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      {user && <Navbar currentScreen={currentScreen} navigate={navigate} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});