import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const CadStore = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');

    const handleAddStore = async () => {
        try {
            const response = await axios.post('https://server-checklist.onrender.com/lojas', {
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
            <Text style={styles.headerText}>Cadastro de Lojas</Text>
        </View>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={text => setNome(text)}
            />
                <TouchableOpacity style = {styles.button} onPress={handleAddStore}>
                    <Image 
                        source={require('../../../assets/done3.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
        </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor:'#fff'
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
});

export default CadStore;
