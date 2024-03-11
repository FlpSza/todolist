import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function CadUser() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Essa vai ser a tela de Setores da minha aplicação.</Text>
            <StatusBar style="auto" />
            <TouchableOpacity onPress={() => navigation.goBack()} style={ styles.header }>
                <Text style={styles.backButton}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    backButton: {
        fontSize: 18,
        color: 'blue',
    },
});
