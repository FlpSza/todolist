import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ChecklistItem = ({ item, onToggle }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onToggle(item, option);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'Sim' && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect('Sim')}
        >
          <Text>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'Não' && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect('Não')}
        >
          <Text>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Asg = () => {
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    const fetchASGQuestions = () => {
      axios.get('http://localhost:3000/perguntas/4') // Alterado para buscar perguntas do setor ASG (idSetor = 4)
        .then(response => {
          if (response.data && Array.isArray(response.data)) {
            const questions = response.data.map(item => item.textoPergunta);
            setChecklistItems(questions);
          } else {
            console.error('Resposta inválida ao buscar perguntas do setor ASG:', response.data);
            // Tratar a resposta inválida conforme necessário
          }
        })
        .catch(error => {
          console.error('Erro ao buscar perguntas do setor ASG:', error);
        });
    };

    fetchASGQuestions();
  }, []);

  const handleToggle = (item, option) => {
    console.log(`Pergunta: ${item}, Opção selecionada: ${option}`);
  };

  return (
    <View style={styles.container}>
      {checklistItems.map((item, index) => (
        <ChecklistItem key={index} item={item} onToggle={handleToggle} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
  options: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
});

export default Asg;
