import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CadPergunta = () => {
  const [textoPergunta, setTextoPergunta] = useState('');
  const [tipoResposta, setTipoResposta] = useState('');

  const handleCadastroPergunta = () => {
    // Aqui você pode implementar a lógica para enviar os dados para o backend e cadastrar a pergunta

    // Limpa os campos após o cadastro
    setTextoPergunta('');
    setTipoResposta('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Texto da Pergunta:</Text>
      <TextInput
        style={styles.input}
        value={textoPergunta}
        onChangeText={setTextoPergunta}
        placeholder="Digite o texto da pergunta"
      />
      <Text style={styles.label}>Tipo de Resposta:</Text>
      <TextInput
        style={styles.input}
        value={tipoResposta}
        onChangeText={setTipoResposta}
        placeholder="Digite o tipo de resposta"
      />
      <Button title="Cadastrar Pergunta" onPress={handleCadastroPergunta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CadPergunta;
