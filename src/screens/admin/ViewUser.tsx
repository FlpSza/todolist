import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function ViewUser() {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Função para buscar a lista de usuários do backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/userlist');
                setUsers(response.data); // Define os usuários obtidos na resposta
            } catch (error) {
                console.error('Erro ao buscar lista de usuários:', error);
                // Trate o erro adequadamente (exibindo uma mensagem de erro, por exemplo)
            }
        };

        // Chama a função para buscar os usuários ao carregar o componente
        fetchUsers();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleUserPress(item)}>
            <Text style={styles.item}>{item.nome}</Text>
        </TouchableOpacity>
    );

    const handleUserPress = (user) => {
        console.log('Usuário selecionado:', user);
        // Aqui você pode navegar para a tela de detalhes do usuário
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.idUsuario.toString()}
            />
            <StatusBar style="auto" />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
