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
      <ImageBackground source={require('../../../assets/smallLogoBlue.png')} style={styles.imageContainer}>
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
    navigation.navigate('ViewStore');
  };

  const handleButton3Press = () => {
    navigation.navigate('ViewSector');
  };

  return (
<View style={styles.container}>
  <ImageBackground source={require('../../../assets/smallLogoBlue.png')} style={styles.imageContainer}>
    <View style={styles.content}>
      {/* Conteúdo do Cadastro aqui */}
    </View>
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
  </ImageBackground>
</View>
  );
};

const Setores = () => {
  return (
    <Text>Setores</Text>
  );
};

const Lojas = () => {
  return (
    <Text>Lojas</Text>
  );
};

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'AdminDashboard', title: 'Home', icon: 'home' },
    { key: 'Cadastro', title: 'Cadastro', icon: 'account-plus' },
    { key: 'Setores', title: 'Setores', icon: 'store' },
    { key: 'Lojas', title: 'Lojas', icon: 'shopping' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    AdminDashboard: AdminDashboard,
    Cadastro: Cadastro,
    Setores: Setores,
    Lojas: Lojas,
  });

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
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
