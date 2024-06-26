import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import axios from 'axios';

const CadSector = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');

    const handleAddSector = async () => {
        try {
            const response = await axios.post('https://server-checklist.onrender.com/setores', {
                nmSetor: nome,
            });
            Alert.alert('Sucesso', response.data.mensagem);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao cadastrar setor:', error);
            Alert.alert('Erro', 'Erro ao cadastrar setor. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Cadastro de Setor</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Setor"
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
                <TouchableOpacity style = {styles.button} onPress={handleAddSector}>
                    <Image 
                        source={require('../../../assets/done3.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    img: {
        // width: 60,
        // height: 60  
    },
    button: {
        borderRadius: 80,
        marginHorizontal: 1,
        padding: 5,
        width: 60, // Defina a largura do botão para 120
        height: 60, // Defina a altura do botão para 120
        justifyContent: 'center', // Centralize o conteúdo verticalmente
        alignItems: 'center', // Centralize o conteúdo horizontalmente
        // backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#fff',
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
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default CadSector;
