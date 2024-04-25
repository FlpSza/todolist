import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
          <Text style={styles.optionText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'Não' && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect('Não')}
        >
          <Text style={styles.optionText}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cozinha = () => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [responses, setResponses] = useState({});
  const [observation, setObservation] = useState('');
  const [showObservation, setShowObservation] = useState(false);
  const [isAbertura, setIsAbertura] = useState(true); // Estado para controlar se é abertura ou fechamento

  useEffect(() => {
    const fetchASGQuestions = async () => {
      try {
        const tipoPergunta = isAbertura ? 'Abertura' : 'Fechamento'; // Determina o tipo de pergunta
        const response = await axios.get(`https://server-checklist.onrender.com/perguntas/5?type=${tipoPergunta}`);
  
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
        <Text style={styles.headerText}>CHECKLIST COZINHA</Text>
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
            <Image source={require('../../../assets/abertura.png')}
            style={styles.imgBtn}
            />
            <Text style={isAbertura ? styles.activeButtonText : styles.buttonText}>Abertura</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAbertura(false)}>
          <Image source={require('../../../assets/fechamento.png')}
            style={styles.imgBtn}
            />
            <Text style={!isAbertura ? styles.activeButtonText : styles.buttonText}>Fechamento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleObservationToggle}>
          <Image source={require('../../../assets/observa.png')}
            style={styles.imgBtn}
            />
            <Text style={styles.buttonText}>Observação</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={generateReportPDF}>
          <Image source={require('../../../assets/genRelatorio.png')}
            style={styles.imgBtn}
            />
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
    flex: 1,
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
  optionText: {
    fontSize: 16,
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
    top: 40
  },
  imgBtn: {
    height: 35,
    width: 35,
    alignContent: "center",
    alignSelf: "center",
    bottom: 10
  },
  imgBtn2: {
    height: 45,
    width: 45,
    bottom: 15
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
    bottom: 10
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

export default Cozinha;
