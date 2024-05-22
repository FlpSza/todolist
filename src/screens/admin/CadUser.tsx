import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { Picker } from '@react-native-picker/picker';
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
                const response = await axios.get('https://server-checklist.onrender.com/sectorlist');
                setSetores(response.data);
            } catch (error) {
                console.error('Erro ao buscar setores:', error);
            }
        };

        const fetchLojas = async () => {
            try {
                const response = await axios.get('https://server-checklist.onrender.com/storelist');
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
            const response = await axios.post('https://server-checklist.onrender.com/users', {
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
                    <Picker
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Selecione o setor', value: null }}
                        onValueChange={(value) => setSelectedSetor(value)}
                        items={setores.map(setor => ({ label: setor.nmSetor, value: setor.idSetor, key: setor.idSetor }))} />
                    <Picker
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Selecione a loja', value: null }}
                        onValueChange={(value) => setSelectedLoja(value)}
                        items={lojas.map(loja => ({ label: loja.nmLoja, value: loja.idLoja, key: loja.idLoja }))} />
                <TouchableOpacity style = {styles.button} onPress={handleAddUser}>
                    <Image 
                        source={require('../../../assets/done3.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
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
        left: 150
        // backgroundColor: 'black',
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
        paddingHorizontal: 10,
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
