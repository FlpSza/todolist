import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function ViewSector() {
    const navigation = useNavigation();
    const [sectors, setSectors] = useState([]);

    const fetchSectors = async () => {
        try {
            const response = await axios.get('https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/sectorlist');
            setSectors(response.data);
        } catch (error) {
            console.error('Erro ao buscar lista de setores:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchSectors();
        });

        return unsubscribe;
    }, [navigation]);

    const handleDeleteSector = async (sectorId) => {
        try {
            await axios.delete(`https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/sector/${sectorId}`);
            setSectors(sectors.filter(sector => sector.idSetor !== sectorId));
        } catch (error) {
            console.error('Erro ao excluir setor:', error);
        }
    };

    const handleAddSector = () => {
        navigation.navigate('CadSector' as never);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.userInfo}>
                <Text>ID: {item.idSetor}</Text>
                <Text style={styles.userInfoText}>| Nome: {item.nmSetor}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteSector(item.idSetor)}>
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
                <Text style={styles.headerText}>LISTA DE SETORES</Text>
            </View>
            <FlatList
                style={styles.flatlist}
                contentContainerStyle={{ paddingTop: 25 }}
                data={sectors}
                renderItem={renderItem}
                keyExtractor={(item) => item.idSetor.toString()}
            />
            <TouchableOpacity onPress={handleAddSector} style={styles.addButton}>
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
        top: -10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userInfo: {
        flex: 1,
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
