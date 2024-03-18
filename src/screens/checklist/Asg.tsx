import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { useNavigation } from '@react-navigation/native';


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
  const [responses, setResponses] = useState({});
  const [observation, setObservation] = useState('');
  const [showObservation, setShowObservation] = useState(false);
  const [isAbertura, setIsAbertura] = useState(true); // Estado para controlar se é abertura ou fechamento

    // Função para gerar o PDF
    const generatePDF = async () => {
      const htmlContent = `
        <html>
          <head>
            <title>Relatório de Checklist</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              h1 {
                color: blue;
              }
              .response {
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <h1>Relatório de Checklist ASG</h1>
            <h2>${isAbertura ? 'Abertura' : 'Fechamento'}</h2>
            <div class="responses">
              ${checklistItems
                .map(
                  (item, index) => `
                <div class="response">
                  <p>${index + 1}. ${item}: ${responses[item] || ''}</p>
                </div>
              `
                )
                .join('')}
            </div>
            ${showObservation && `<p>Observação: ${observation}</p>`}
          </body>
        </html>
      `;
  
      try {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        console.log('PDF gerado com sucesso:', uri);
      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
      }
    };

  useEffect(() => {
    const fetchASGQuestions = async () => {
      try {
        const tipoPergunta = isAbertura ? 'Abertura' : 'Fechamento'; // Determina o tipo de pergunta
        const response = await axios.get(`http://localhost:3000/perguntas/4?type=${tipoPergunta}`);
  
        if (response.data && Array.isArray(response.data)) {
          const questions = response.data.map((item) => item.textoPergunta);
          setChecklistItems(questions);
          initializeResponses(questions);
        } else {
          console.error(`Resposta inválida ao buscar perguntas do tipo ${tipoPergunta} para o setor ASG:`, response.data);
        }
      } catch (error) {
        console.error(`Erro ao buscar perguntas do tipo para o setor ASG:`, error);
      }
    };
  
    fetchASGQuestions();
  }, [isAbertura]); // Execute sempre que o estado isAbertura mudar
  
  

  const initializeResponses = (questions) => {
    const initialResponses = {};
    questions.forEach((question) => {
      initialResponses[question] = '';
    });
    setResponses(initialResponses);
  };

  const handleToggle = (item, option) => {
    setResponses({ ...responses, [item]: option });
  };

  const handleObservationToggle = () => {
    setShowObservation(!showObservation);
  };

  const generateReportPDF = async () => {
    // Lógica para gerar o relatório PDF
    // ...
  };

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.headerText}>CHECKLIST ASG</Text>
      </View>
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
          <TouchableOpacity onPress={() => setIsAbertura(true)}>
            <Text style={isAbertura ? styles.activeButtonText : styles.buttonText}>Abertura</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAbertura(false)}>
            <Text style={!isAbertura ? styles.activeButtonText : styles.buttonText}>Fechamento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleObservationToggle}>
            <Text style={styles.buttonText}>Observação</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={generatePDF}>
            <Text style={styles.buttonText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
  activeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green', // Cor diferente para a aba ativa
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%', // Defina a largura total do cabeçalho
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
});

export default Asg;
