import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import email from 'react-native-email';

const fetchUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get('https://server-checklist.onrender.com/user-info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const ChecklistItem = ({ item, isChecked, onToggle }) => {
  const handleCheckboxToggle = () => {
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

const Bar = () => {
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
        const response = await axios.get(`https://server-checklist.onrender.com/perguntas/2?type=${tipoPergunta}`);

        if (response.data && Array.isArray(response.data)) {
          const questions = response.data.map((item) => ({ textoPergunta: item.textoPergunta, isChecked: false }));
          setChecklistItems(questions);
          initializeResponses(questions);
        } else {
          console.error(`Resposta inválida ao buscar perguntas do tipo ${tipoPergunta} para o setor Bar:`, response.data);
        }
      } catch (error) {
        console.error(`Erro ao buscar perguntas do tipo para o setor Bar:`, error);
      }
    };

    fetchASGQuestions();
  }, [isAbertura]);

  useEffect(() => {
    setShowObservationAbertura(false); // Feche a observação de abertura quando mudar para fechamento
  }, [isAbertura]);

  useEffect(() => {
    setShowObservationFechamento(false); // Feche a observação de fechamento quando mudar para abertura
  }, [!isAbertura]);

  const initializeResponses = (questions) => {
    const initialResponses = {};
    questions.forEach((question) => {
      initialResponses[question.textoPergunta] = '';
    });
    setResponses(initialResponses);
  };

const handleToggle = (item, isChecked) => {
  const updatedChecklistItems = checklistItems.map((question) => {
    if (question.textoPergunta === item) {
      return { ...question, isChecked };
    }
    return question;
  });
  setChecklistItems(updatedChecklistItems);

  // Atualiza as respostas conforme a marcação da checkbox
  const updatedResponses = { ...responses };
  updatedResponses[item] = isChecked; // Define a resposta como true ou false
  setResponses(updatedResponses);
};

  const handleObservationToggleAbertura = () => {
    setShowObservationAbertura(!showObservationAbertura);
    setShowObservationFechamento(false);
  };

  const handleObservationToggleFechamento = () => {
    setShowObservationFechamento(!showObservationFechamento);
    setShowObservationAbertura(false);
  };

const gerarRelatorio = async () => {
  try {
    const dataHora = moment().format('DD/MM/YYYY HH:mm');

    // Obtenha os dados do usuário antes de criar o relatório
    const userData = await fetchUserData();
    console.log(userData);

    // Verifica se há perguntas não respondidas e preenche automaticamente como "Não"
    const perguntasComRespostas = checklistItems.map((item) => ({
      textoPergunta: item.textoPergunta,
      resposta: responses[item.textoPergunta] === true ? 'Sim' : 'Não',
    }));

const relatorioHTML = `
<html>
  <head>
    <style>
      .logo-container {
        text-align: center; /* Centraliza horizontalmente */
        margin-bottom: 50px; /* Adiciona margem inferior para separar da próxima seção */
      }
      .logo-img {
        max-width: 30%;
        height: auto;
        border-radius: 50%;
      }
      body { font-family: Arial, sans-serif; display: flex; flex-direction: column; min-height: 100vh; margin: 0; }
      .content { flex: 1; display: flex; flex-direction: column; }
      .main-container {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        margin: 20px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .pergunta {
        margin-bottom: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
      }
      .resposta-sim { color: green; }
      .resposta-nao { color: red; }
      .data-hora-container {
        margin-top: auto;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        text-align: right;
      }
      footer {
        text-align: center;
        padding: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="logo-container">
      <img class="logo-img" src="https://drive.google.com/file/d/1DYGETsJxQc3Q5VmpjtoyA8hQVJ18np7f/view?usp=sharing" alt="Logo da empresa" />
    </div>
    <div class="content">
      <div class="main-container">
        <div class="pergunta">
          <strong>Nome do Usuário: ${userData.nome}</strong>
        </div>
        ${perguntasComRespostas.map((pergunta) => `
          <div class="pergunta">
            <strong>${pergunta.textoPergunta}</strong>
            <span class="${pergunta.resposta === 'Sim' ? 'resposta-sim' : 'resposta-nao'}">${pergunta.resposta}</span>
          </div>
        `).join('')}
        <div class="data-hora-container">
          <div class="data-hora">Data e Hora de Geração: ${dataHora}</div>
        </div>
      </div>
    </div>
    ${observationAbertura && `
          <div class="observacao">
            <strong>Observação:</strong>
            <p>${observationAbertura}</p>
          </div>
        `}
        ${observationFechamento && `
          <div class="observacao">
            <strong>Observação:</strong>
            <p>${observationFechamento}</p>
          </div>
        `}
    <footer>
      <div>______________________________________<br>Assinatura do responsável</div>
    </footer>
  </body>
</html>
`;


    const resultado = await Print.printToFileAsync({ html: relatorioHTML });
    const pdfUri = resultado.uri;

sendEmailWithAttachment = async () => {
  try {
    const to = ['fellipe.silva@grupostarinfo.com.br']// Endereços de email dos destinatários
    const bcc = ['ofellipe2023@gmail.com']; // Endereços de email de cópia carbono oculta
    const subject = 'Relatorio do dia do setor BAR';
    const body = 'Segue em anexo o relatorio do dia do setor';
    const attachment = {
      uri: [pdfUri],
      name: 'relatorio.pdf',
    };

    email(to, bcc, {
        subject,
        body,
        attachment,
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
    await sendEmailWithAttachment();
    // Compartilhar o PDF gerado
    await Sharing.shareAsync(pdfUri, { mimeType: 'application/pdf', dialogTitle: 'Compartilhar PDF' });
  } catch (error) {
    Alert.alert('Erro', error.message);
    console.error('Erro ao gerar o relatório:', error);
  }
};

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.headerText}>CHECKLIST BAR</Text>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {checklistItems.map((item, index) => (
            <ChecklistItem
              key={index}
              item={item.textoPergunta}
              isChecked={item.isChecked}
              onToggle={handleToggle}
            />
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
          <TouchableOpacity onPress={gerarRelatorio}>
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
    backgroundColor: 'blue',
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
    color: 'green',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
});

export default Bar;
