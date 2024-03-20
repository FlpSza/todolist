import React from 'react';
import AppNavigator from './src/components/AppNavigator';
import { Platform, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
}
