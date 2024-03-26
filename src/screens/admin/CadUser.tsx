import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const CadUser = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [setores, setSetores] = useState([]);
    const [lojas, setLojas] = useState([]);
    const [selectedSetor, setSelectedSetor] = useState('');
    const [selectedLoja, setSelectedLoja] = useState('');
    

    useEffect(() => {
        const fetchSetores = async () => {
            try {
                const response = await axios.get('https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/sectorlist');
                setSetores(response.data);
            } catch (error) {
                console.error('Erro ao buscar setores:', error);
            }
        };

        const fetchLojas = async () => {
            try {
                const response = await axios.get('https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/storelist');
                setLojas(response.data);
            } catch (error) {
                console.error('Erro ao buscar lojas:', error);
            }
        };

        fetchSetores();
        fetchLojas();
    }, []);

    const handleAddUser = async () => {
        try {
            const response = await axios.post('https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/users', {
                nome,
                email,
                senha,
                idSetor: selectedSetor,
                idLoja: selectedLoja
            });
            Alert.alert('Sucesso', response.data.mensagem);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro ao cadastrar usuário. Por favor, tente novamente.');
        }
    };

    return (
        <><View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="blue" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Cadastro de Usuários</Text>
        </View><View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={text => setNome(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={text => setSenha(text)} />
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Selecione o setor', value: null }}
                        onValueChange={(value) => setSelectedSetor(value)}
                        items={setores.map(setor => ({ label: setor.nmSetor, value: setor.idSetor, key: setor.idSetor }))} />
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Selecione a loja', value: null }}
                        onValueChange={(value) => setSelectedLoja(value)}
                        items={lojas.map(loja => ({ label: loja.nmLoja, value: loja.idLoja, key: loja.idLoja }))} />
                    <Button title="Cadastrar" onPress={handleAddUser} />
                </View>
            </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        width: '100%',
        marginTop: 20,
        alignItems: 'flex-start',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default CadUser;
