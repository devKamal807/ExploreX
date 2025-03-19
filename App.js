import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './src/screen/Splash'
import Onboard from './src/screen/Onboard'
import GoogleLoginScreen from './src/screen/GoogleLoginScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="Onboard" component={Onboard}/>
      <Stack.Screen name="GoogleLoginScreen" component={GoogleLoginScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})