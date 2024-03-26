import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AdminDashboard from '../admin/AdminDashboard';

export default function Login() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 30,
      useNativeDriver: false
    }).start();
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    console.log(email, password)
    try {
      const response = await axios.post('https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/login', {
        email,
        senha: password // Envie a senha como 'senha'
      });

      if (!response.data.token) {
        throw new Error('Token não recebido');
      }

      // Salvar o token ou outras informações de autenticação, se necessário
      await AsyncStorage.setItem('token', response.data.token);

      // Obter informações adicionais do usuário usando o token
      const userResponse = await axios.get('https://21ef-2804-d41-b066-6900-e906-e6be-d145-2d5b.ngrok-free.app/user-info', {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      });

      // Verificar o tipo de setor do usuário e redirecionar de acordo
      const { idSetor } = userResponse.data;
      if (idSetor === 7) {
        navigation.navigate('AdminDashboard');
      } else if (idSetor === 1) {
        navigation.navigate('SalaoDashboard');
      } else if (idSetor === 2) {
        navigation.navigate('BarDashboard');
      } else if (idSetor === 3) {
        navigation.navigate('CaixaDashboard');
      } else if (idSetor === 4) {
        navigation.navigate('AsgDashboard');
      } else if (idSetor === 5) {
        navigation.navigate('CozinhaDashboard');
      } else if (idSetor === 6) {
        navigation.navigate('ProducaoDashboard');
      } else {
        console.error('Setor de usuário desconhecido:', idSetor);
        // Redirecionar para uma tela de erro ou para a tela inicial
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.response) {
        // O servidor retornou uma resposta com um status de erro
        console.error('Erro de login:', error.response.data);
        console.error('Status do erro:', error.response.status);
      } else if (error.request) {
        // A requisição foi feita, mas não recebeu resposta
        console.error('Erro de rede:', error.request);
      } else {
        // Ocorreu um erro durante o processamento da requisição
        console.error('Erro inesperado:', error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Image
            source={require('../../../assets/logoRd.png')}
          />
        </View>

        <Animated.View style={[
          styles.container,
          {
            transform: [
              {
                translateY: offset.y
              }
            ]
          }
        ]}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCorrect={false}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder='Senha'
            autoCorrect={false}
            onChangeText={setPassword}
            secureTextEntry={true} // Para ocultar a senha
          />

          <TouchableOpacity style={styles.btnSubmit} onPress={handleLogin}>
            <Text>
              Acessar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 190
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#002385',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  }
});