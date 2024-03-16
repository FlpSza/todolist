import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const [observation, setObservation] = useState('');
  const [showObservation, setShowObservation] = useState(false);

  useEffect(() => {
    const fetchASGQuestions = async () => {
        try {
          const response = await axios.get('http://localhost:3000/perguntas/4');
      
          if (response.data && Array.isArray(response.data)) {
            const questions = response.data.map((item) => item.textoPergunta);
            setChecklistItems(questions);
          } else {
            console.error('Resposta inválida ao buscar perguntas do setor ASG:', response.data);
          }
        } catch (error) {
          console.error('Erro ao buscar perguntas do setor ASG:', error);
        }
      };
      
    fetchASGQuestions();
  }, []);

  const handleToggle = (item, option) => {
    console.log(`Pergunta: ${item}, Opção selecionada: ${option}`);
  };

  const handleObservationToggle = () => {
    setShowObservation(!showObservation);
  };

  const handleGenerateReport = () => {
    // Lógica para gerar o relatório
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {checklistItems.map((item, index) => (
          <ChecklistItem key={index} item={item} onToggle={handleToggle} />
        ))}
        {showObservation && (
          <TextInput
            style={styles.observationInput}
            value={observation}
            onChangeText={setObservation}
            placeholder="Digite sua observação..."
            multiline
          />
        )}
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={handleObservationToggle}>
          <Text style={styles.buttonText}>Observação</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGenerateReport}>
          <Text style={styles.buttonText}>Gerar Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
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
  observationInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Asg;
