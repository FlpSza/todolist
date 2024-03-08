import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function Login() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = navigator();

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
        const response = await axios.post('http://localhost:3000/login', {
            email,
            password
        });

        if (!response.data.token) {
            throw new Error('Token não recebido');
        }

        // Salve o token ou outras informações de autenticação, se necessário
        await AsyncStorage.setItem('token', response.data.token);

        // Redirecione para outra tela, se necessário
        // navigation.navigate('Home');
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
                      source={require('../../../assets/logo.png')}
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
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      paddingBottom: 200
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
      backgroundColor: '#35AAFF',
      width: '90%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
  }
});