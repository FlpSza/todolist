import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';



export default function AdminDashboard () {
    return(
        <View style = {styles.container}>
        <Text>Essa vai ser a main da minha aplicação. vai ter a tela com um navbar</Text>
        <StatusBar style="auto" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });