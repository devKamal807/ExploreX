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
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import installations from '@react-native-firebase/installations';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [splashLogo, setSplashLogo] = useState(true);
  const [installationId, setInstallationId] = useState(null);

  // const testCrash = () => {
  //   crashlytics().log('Testing Crashlytics');
  //   crashlytics().crash();
  // };


 

async function logEvent() {
  await analytics().logEvent('app_opened', {
    screen: 'GoogleLoginScreen',
    user_id: '5',
  });
}

const fetchInstallationId = async () => {
  try {
    const id = await installations().getId();
    setInstallationId(id);
    console.log('Firebase Installation ID:', id);
  } catch (error) {
    console.error('Error fetching Installation ID:', error);
  }
};



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

    // testCrash();
    logEvent();
    fetchInstallationId();
    
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
