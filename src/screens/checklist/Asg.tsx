import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import * as Print from 'expo-print';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; // Para manipulação de datas

const ChecklistItem = ({ item, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
    onToggle(item, !isChecked);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item}</Text>
      </View>
      <TouchableOpacity onPress={handleCheckboxToggle}>
        <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
          {isChecked && <Ionicons name="checkmark" size={20} color="white" />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Asg = () => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [responses, setResponses] = useState({});
  const [observationAbertura, setObservationAbertura] = useState('');
  const [observationFechamento, setObservationFechamento] = useState('');
  const [showObservationAbertura, setShowObservationAbertura] = useState(false);
  const [showObservationFechamento, setShowObservationFechamento] = useState(false);
  const [isAbertura, setIsAbertura] = useState(true);
  const [exibirRelatorio, setExibirRelatorio] = useState(false);
  const [relatorioGerado, setRelatorioGerado] = useState(null);

  useEffect(() => {
    const fetchASGQuestions = async () => {
      try {
        const tipoPergunta = isAbertura ? 'Abertura' : 'Fechamento';
        const response = await axios.get(`https://server-checklist.onrender.com/perguntas/4?type=${tipoPergunta}`);

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
  }, [isAbertura]);

  useEffect(() => {
    setShowObservationAbertura(false); // Feche a observação de abertura quando mudar para fechamento
  }, [isAbertura]);

  useEffect(() => {
    setShowObservationFechamento(false); // Feche a observação de abertura quando mudar para fechamento
  }, [!isAbertura]);

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

  const handleObservationToggleAbertura = () => {
    setShowObservationAbertura(!showObservationAbertura);
    setShowObservationFechamento(false);
  };

  const handleObservationToggleFechamento = () => {
    setShowObservationFechamento(!showObservationFechamento);
    setShowObservationAbertura(false);
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
          {showObservationAbertura && (
            <TextInput
              style={styles.observationInput}
              value={observationAbertura}
              onChangeText={setObservationAbertura}
              placeholder="Digite sua observação para abertura..."
              multiline
            />
          )}
          {showObservationFechamento && (
            <TextInput
              style={styles.observationInput}
              value={observationFechamento}
              onChangeText={setObservationFechamento}
              placeholder="Digite sua observação para fechamento..."
              multiline
            />
          )}
        </ScrollView>
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={() => setIsAbertura(true)}>
            <Image source={require('../../../assets/abertura.png')} style={styles.imgBtn} />
            <Text style={isAbertura ? styles.activeButtonText : styles.buttonText}>Abertura</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAbertura(false)}>
            <Image source={require('../../../assets/fechamento.png')} style={[styles.imgBtn, styles.imgBtn2]} />
            <Text style={!isAbertura ? styles.activeButtonText : styles.buttonText}>Fechamento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={isAbertura ? handleObservationToggleAbertura : handleObservationToggleFechamento}>
            <Image source={require('../../../assets/observa.png')} style={styles.imgBtn} />
            <Text style={styles.buttonText}>
              {isAbertura ? 'Observação Abertura' : 'Observação Fechamento'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../assets/genRelatorio.png')} style={styles.imgBtn} />
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    questionContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
    },
    questionText: {
      fontSize: 16,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
  checked: {
    backgroundColor: 'blue', // Cor quando o checkbox está marcado
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

export default Asg;
