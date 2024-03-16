import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Platform } from 'react-native';

const backgroundImg = require('../../../assets/smallLogoBlue.png');
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const SalaoDashboard = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMenuPress = () => {
      setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option) => {
      if (option === 'checklist') {
          // Navegar para a tela de checklist
          navigation.navigate('Salao');
          console.log('Checklist')
      } else if (option === 'logout') {
          // Limpar o token de autenticação e redirecionar para a tela de login
          handleLogout();
          console.log('Logout')
      }
      setShowOptions(false);
  };

  const handleLogout = () => {
      // Depois de limpar as informações de autenticação, navegue de volta para a tela de login
      navigation.navigate('Login');
  };

  return (
      <>
          <Appbar.Header>
              <Appbar.Content title="Central Salao" subtitle={'Subtitle'} />
              <Appbar.Action icon={MORE_ICON} onPress={handleMenuPress} />
          </Appbar.Header>
          <View style={styles.container}>
              <ImageBackground source={backgroundImg} style={styles.backgroundImg} />
              <View style={[styles.optionsContainer, showOptions ? null : styles.hidden]}>
                  <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect('checklist')}>
                      <Text style={styles.optionText}>Checklist</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect('logout')}>
                      <Text style={styles.optionText}>Logout</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.5,
    },
    optionsContainer: {
      position: 'absolute',
      top: -15, // Ajuste conforme necessário para não cobrir os botões
      right: 1,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
    },
    option: {
        paddingVertical: 8,
    },
    optionText: {
        fontSize: 16,
        zIndex: 1
    },
    hidden: {
      display: 'none',
    },
});

export default SalaoDashboard;

