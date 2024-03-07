import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import AdminDashboard from './src/screens/admin/AdminDashboard';
import Login from './src/screens/login/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Login/>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={Login} />
    //     <Stack.Screen name="Details" component={AdminDashboard} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}