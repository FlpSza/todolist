import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const CadPergunta = () => {
  const navigation = useNavigation();
  const [textoPergunta, setTextoPergunta] = useState('');
  const [idSetor, setIdSetor] = useState('');
  const [tipoPergunta, setTipoPergunta] = useState('Abertura'); // Estado para o tipo de pergunta: Abertura ou Fechamento
  const [setores, setSetores] = useState([]);

  useEffect(() => {
    // Obtenha a lista de setores do backend
    axios.get('https://d3cc-2804-d41-b066-6900-c087-456a-2b2a-9253.ngrok-free.app/sectorlist')
      .then(response => {
        setSetores(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter setores:', error);
      });
  }, []);

  const handleCadastroPergunta = () => {
    // Envie os dados da pergunta para o backend
    const novaPergunta = {
      textoPergunta,
      idSetor,
      tipoPergunta
    };

    axios.post('https://d3cc-2804-d41-b066-6900-c087-456a-2b2a-9253.ngrok-free.app/perguntas', novaPergunta)
      .then(response => {
        console.log('Pergunta cadastrada com sucesso:', response.data);
        // Limpe os campos após o cadastro
        setTextoPergunta('');
        setIdSetor('Selecione um setor...');
        setTipoPergunta('Selecione um tipo de pergunta...'); // Reinicia para o valor padrão
      })
      .catch(error => {
        console.error('Erro ao cadastrar pergunta:', error);
        console.log()
      });
  };

  return (
    <>            
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="blue" />
    </TouchableOpacity>
    <Text style={styles.headerText}>Adicionar pergunta</Text>
    </View>

    <View style={styles.container}>

        <Text style={styles.label}>Texto da Pergunta:</Text>
        <TextInput
          style={styles.input}
          value={textoPergunta}
          onChangeText={setTextoPergunta}
          placeholder="Digite o texto da pergunta" />
      <Text style={styles.label}>Setor:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecione um setor...', value: '' }}
        onValueChange={(value) => setIdSetor(value)}
        items={setores.map(setor => ({ label: setor.nmSetor, value: setor.idSetor }))}
      />

      <Text style={styles.label}>Tipo de Pergunta:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecione o tipo de pergunta...', value: '' }}
        onValueChange={(value) => setTipoPergunta(value)}
        items={[
          { label: 'Abertura', value: 'Abertura' },
          { label: 'Fechamento', value: 'Fechamento' }
        ]}
      />

        <Button title="Cadastrar Pergunta" onPress={handleCadastroPergunta} />
      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
    top: 10
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 5,
},
header: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: 10,
  paddingTop: 10,
  width: '100%', // Defina a largura total do cabeçalho
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
headerText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 10,
},
botaoCadastro: {

}
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default CadPergunta;
