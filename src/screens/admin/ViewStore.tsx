import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';



export default function ViewStore () {
    return(
        <View style = {styles.container}>
        <Text>Essa vai ser a tela de LOJAS da minha aplicação. vai ter a tela com as lojas e o botao de cadastro</Text>
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