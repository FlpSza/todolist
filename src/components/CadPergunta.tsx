import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const CadPergunta = () => {
  const [textoPergunta, setTextoPergunta] = useState('');
  const [idSetor, setIdSetor] = useState('');
  const [setores, setSetores] = useState([]);

  useEffect(() => {
    // Aqui você pode fazer uma requisição para obter a lista de setores do backend
    // Exemplo:
    axios.get('http://localhost:3000/sectorlist')
      .then(response => {
        setSetores(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter setores:', error);
      });
  }, []);

  const handleCadastroPergunta = () => {
    // Aqui você pode implementar a lógica para enviar os dados para o backend e cadastrar a pergunta
    const novaPergunta = {
      idQuestionario: 1, // Defina o ID do questionário conforme necessário
      textoPergunta,
      idSetor
    };

    axios.post('http://localhost:3000/perguntas', novaPergunta)
      .then(response => {
        console.log('Pergunta cadastrada com sucesso:', response.data);
        // Limpa os campos após o cadastro
        setTextoPergunta('');
        setIdSetor('');
      })
      .catch(error => {
        console.error('Erro ao cadastrar pergunta:', error);
      });
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
      <Text style={styles.label}>Setor:</Text>
      <Picker
  selectedValue={idSetor}
  onValueChange={(itemValue) => setIdSetor(itemValue)}
>
  <Picker.Item label="Selecione um setor..." value="" />
  {setores.map(setor => (
    <Picker.Item key={setor.idSetor} label={setor.nmSetor} value={setor.idSetor} />
  ))}
</Picker>

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
