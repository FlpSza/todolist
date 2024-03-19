import * as React from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Text, Button, IconButton } from 'react-native-paper';
import { View, ImageBackground, StyleSheet } from 'react-native';
import ViewUser from './ViewUser';
import ViewStore from './ViewStore';
import ViewSector from './ViewSector';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/smallLogoBlue.png')} style={[styles.imageContainer, {opacity: 0.3}]}>
      </ImageBackground>
    </View>
  );
};

const Cadastro = () => {
  const navigation = useNavigation<any>();

  const handleButton1Press = () => {
    navigation.navigate('ViewUser');
  };

  const handleButton2Press = () => {
    navigation.navigate('CadStore');
  };

  const handleButton3Press = () => {
    navigation.navigate('CadSector');
  };

  const handleButton4Press = () => {
    navigation.navigate('CadPergunta');
  };

  return (
<View style={styles.container}>
<ImageBackground source={require('../../../assets/smallLogoBlue.png')} style={[styles.backgroundContainer, {opacity: 0.2}]}>      </ImageBackground>
  <View style={styles.imageContainer}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <IconButton
                icon="account-plus"
                size={50}
                onPress={handleButton1Press}
                style={[styles.button, styles.icon]}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                icon="store"
                size={50}
                onPress={handleButton2Press}
                style={[styles.button, styles.icon]}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                icon="format-list-bulleted"
                size={50}
                onPress={handleButton3Press}
                style={[styles.button, styles.icon]}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                icon="plus-circle"
                size={50}
                onPress={handleButton4Press}
                style={[styles.button, styles.icon]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const MyComponent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={AdminDashboard}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'account-plus' : 'account-plus-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Cadastro',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setores"
        component={ViewSector} // Altere o componente para a tela ViewSector
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'store' : 'store-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Setores',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Lojas"
        component={ViewStore} // Altere o componente para a tela ViewStore
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'shopping' : 'shopping-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Lojas',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%', // Ajusta a largura para ocupar toda a largura da tela
    height: '100%', // Ajusta a altura para ocupar toda a altura da tela
  },
  backgroundContainer: {
    width: '100%', // Ajusta a largura para ocupar toda a largura da tela
    height: '100%', // Ajusta a altura para ocupar toda a altura da tela
    position: 'absolute', // Define a posição absoluta
    
  },
  contentUsers: {
    width: '100%', // Ajusta a largura para ocupar toda a largura da tela
    height: '20%', // Ajusta a altura para ocupar toda a altura da tela
  },
  content: {
    flex: 1, // Isso fará com que este conteúdo ocupe todo o espaço disponível
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column', // Alterado para column para os botões ficarem em colunas
    justifyContent: 'center', // Centraliza os botões verticalmente
    alignItems: 'center', // Centraliza os botões horizontalmente
    paddingHorizontal: 5,
    paddingBottom: 150,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%', // Ajusta a altura para metade da tela
  },  
  button: {
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 5,
    width: 440, // Defina a largura do botão para 120
    height: 50, // Defina a altura do botão para 120
    justifyContent: 'center', // Centralize o conteúdo verticalmente
    alignItems: 'center', // Centralize o conteúdo horizontalmente
    backgroundColor: '#002385',
    // backgroundColor: '#829b86',
  },
  icon: {
    marginTop: 10, // Ajuste a margem superior para alinhar o ícone
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    paddingBottom: 5,
  },  
});
