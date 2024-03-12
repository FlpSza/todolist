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
    navigation.navigate('CadUser');
  };

  const handleButton2Press = () => {
    navigation.navigate('CadStore');
  };

  const handleButton3Press = () => {
    navigation.navigate('CadSector');
  };

  return (
<View style={styles.container}>
  <ImageBackground source={require('../../../assets/smallLogoBlue.png')} style={[styles.imageContainer, {opacity: 0.3}]}>  </ImageBackground>
    <View style={styles.contentUsers}>
      {/* Conteúdo do Cadastro aqui */}
    
    <View style={styles.buttonContainer}>
      <IconButton
        icon="account-plus"
        size={50}
        onPress={handleButton1Press}
        style={styles.button}
      />
      <IconButton
        icon="store"
        size={50}
        onPress={handleButton2Press}
        style={styles.button}
      />
      <IconButton
        icon="format-list-bulleted"
        size={50}
        onPress={handleButton3Press}
        style={styles.button}
      />
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
  },
  imageContainer: {
    width: '100%', // Ajusta a largura para ocupar toda a largura da tela
    height: '100%', // Ajusta a altura para ocupar toda a altura da tela
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Adiciona espaço nas laterais
    paddingBottom: 20, // Adiciona espaço na parte inferior
  },
  button: {
    borderRadius: 25, // Para tornar o botão redondo
  },
});
