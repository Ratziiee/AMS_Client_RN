import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login'
import QRCode from './QRCode'
import Profile from './Profile'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer, StackActions } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function App() {
  return (
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={Login} />
  //     <Stack.Screen name="QrPage" component={QRCode} />
  //   </Stack.Navigator>
  // </NavigationContainer>
    // <View >
    //   <Text>Hello World!!</Text>
      
      
    //   {/* <Login/> */}
    //   <QRCode/>
    //   <StatusBar style="auto" />
    // </View>

    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Login" component = {Login}/>
          <Stack.Screen name = "QrPage" component = {QRCode}/>
          <Stack.Screen name = "Profile" component = {Profile}/>
        </Stack.Navigator>
      </NavigationContainer>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
