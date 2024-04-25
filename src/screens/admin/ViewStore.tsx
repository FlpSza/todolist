import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function ViewStore() {
    const navigation = useNavigation();
    const [stores, setStores] = useState([]);

    const fetchStores = async () => {
        try {
            const response = await axios.get('https://server-checklist.onrender.com/storelist');
            setStores(response.data);
        } catch (error) {
            console.error('Erro ao buscar lista de lojas:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchStores();
        });

        return unsubscribe;
    }, [navigation]);

    const handleDeleteStore = async (storeId) => {
        try {
            await axios.delete(`https://server-checklist.onrender.com/store/${storeId}`);
            setStores(stores.filter(store => store.idLoja !== storeId));
        } catch (error) {
            console.error('Erro ao excluir loja:', error);
        }
    };
    
    const handleAddStore = () => {
        navigation.navigate('CadStore' as never);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.userInfo}>
                <Text>ID: {item.idLoja}</Text>
                <Text style={styles.userInfoText}>| Nome: {item.nmLoja}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteStore(item.idLoja)}>
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
                <Text style={styles.headerText}>LISTA DE LOJAS</Text>
            </View>
            <FlatList
                style={styles.flatlist}
                data={stores}
                renderItem={renderItem}
                keyExtractor={(item) => item.idLoja.toString()}
            />
            <TouchableOpacity onPress={handleAddStore} style={styles.addButton}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
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
        paddingTop: 55,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 5,
        paddingTop: 55
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
        top: 10,
        flexDirection: 'row', // Alinha os textos horizontalmente
        alignItems: 'center', // Alinha os textos verticalmente
        width: '100%', // Ocupa 100% da largura horizontalmente
        justifyContent: 'space-between',
    },
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: 'blue',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfoText: {
        width: '45.33%',
    },
    flatlist: {
        width: '100%',
    },
});
