import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
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

    const handleDeleteUser = async (userId) => {
        try {
            // Endpoint para excluir o usuário
            await axios.delete(`http://localhost:3000/user/${userId}`);
            // Atualiza a lista de usuários após a exclusão
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.userInfo}>
                <Text>ID: {item.idUsuario}                         | Nome: {item.nome}                         | Email: {item.email}                         </Text>
                {/* <Text>Nome: {item.nome}</Text>
                <Text>Email: {item.email}</Text> */}
            </View>
            <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                <Ionicons name="trash-bin" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text style={styles.headerText}>LISTA DE USUÁRIOS</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.idUsuario.toString()}
            />
            <StatusBar style="auto" />
        </View>
    );
}

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
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%', // Defina a largura total do cabeçalho
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userInfo: {
        flex: 1,
    },
});
