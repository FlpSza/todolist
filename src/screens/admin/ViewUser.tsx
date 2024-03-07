import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';



export default function ViewUser () {
    return(
        <View style = {styles.container}>
        <Text>Essa vai ser a tela de Usuarios da minha aplicação. vai ter a tela com os usuarios e o botao de cadastro</Text>
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