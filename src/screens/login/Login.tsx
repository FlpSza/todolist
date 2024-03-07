import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const [offset] = useState(new Animated.ValueXY({x: 0, y:90}));
    useEffect(()=> {

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
    
    return (
    // <MainScreen/>
<TouchableWithoutFeedback onPress = {dismissKeyboard}> 
    <KeyboardAvoidingView style ={styles.background}>
      <View style = {styles.containerLogo}>
        <Image
        source={require('../../../assets/logo.png')}
        />
      </View>

      <Animated.View style = {[
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
        style = {styles.input}
        placeholder='Email'
        autoCorrect={false}
        />

        <TextInput
        style = {styles.input}
        placeholder='Senha'
        autoCorrect={false}
        />

        <TouchableOpacity style = { styles.btnSubmit}>
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
    alignItems:'center',
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