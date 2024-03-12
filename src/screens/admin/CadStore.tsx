import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const CadStore = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');

    const handleAddStore = async () => {
        try {
            const response = await axios.post('http://localhost:3000/lojas', {
                nmLoja: nome,
            });
            Alert.alert('Sucesso', response.data.mensagem);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao cadastrar loja:', error);
            Alert.alert('Erro', 'Erro ao cadastrar loja. Por favor, tente novamente.');
        }
    };

    return (
        <><View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="blue" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Cadastro de lojas</Text>
        </View>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={text => setNome(text)}
            />
            <Button title="Cadastrar" onPress={handleAddStore} />
        </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 10,
        width: '100%', // Defina a largura total do cabeçalho
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
        padding: 5,
    },
});

export default CadStore;
