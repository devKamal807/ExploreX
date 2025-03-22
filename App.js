import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from './src/screen/Splash';
import Onboard from './src/screen/Onboard';
import GoogleLoginScreen from './src/screen/GoogleLoginScreen';
import SigninScreen from './src/screen/SigninScreen';
import Signup from './src/screen/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [splashLogo, setSplashLogo] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
    
        const value = await AsyncStorage.getItem('onboardingShown');
        if (value === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('onboardingShown', 'true');
        } else {
          setIsFirstLaunch(false);
        }

 
        setTimeout(() => setSplashLogo(false), 3000);
      } catch (error) {
        console.log('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  if (splashLogo || isFirstLaunch === null) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? 'Onboard' : 'GoogleLoginScreen'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="GoogleLoginScreen" component={GoogleLoginScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
