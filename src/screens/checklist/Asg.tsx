import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones necessários
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment'; // Para manipulação de datas

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

// const Relatorio = ({ usuarioLogado, respostas }) => {
//   const [relatorioGerado, setRelatorioGerado] = useState(null);

//   const gerarRelatorioPDF = async () => {
//     try {
//       const today = moment().format('DD/MM/YYYY'); // Obtém a data atual formatada
//       const htmlContent = `
//         <h1>RELATÓRIO ABERTURA/FECHAMENTO</h1>
//         <p><strong>Responsável:</strong> ${usuarioLogado}</p>
//         <p><strong>Data:</strong> ${today}</p>
//         <h2>Perguntas e Respostas</h2>
//         ${respostas.map((pergunta, index) => `
//           <p><strong>Pergunta ${index + 1}:</strong> ${pergunta.pergunta}</p>
//           <p><strong>Resposta:</strong> ${pergunta.resposta}</p>
//         `).join('')}
//         <h2>Observações</h2>
//         <p>Aqui você pode adicionar as observações.</p>
//         <br/><br/><br/>
//         <p style="text-align: right;">__________________<br/>Assinatura</p>
//       `;

//       const options = {
//         html: htmlContent,
//         fileName: 'relatorio.pdf',
//         directory: 'Documents',
//       };

//       const pdf = await RNHTMLtoPDF.convert(options);
//       setRelatorioGerado(pdf.filePath);
//     } catch (error) {
//       console.error('Erro ao gerar o relatório PDF:', error);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={gerarRelatorioPDF}>
//         <Text>Gerar Relatório</Text>
//       </TouchableOpacity>
//       {relatorioGerado && (
//         <TouchableOpacity onPress={() => alert(`Relatório gerado em: ${relatorioGerado}`)}>
//           <Text>Abrir Relatório</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

const Asg = () => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [responses, setResponses] = useState({});
  const [observation, setObservation] = useState('');
  const [showObservation, setShowObservation] = useState(false);
  const [isAbertura, setIsAbertura] = useState(true); // Estado para controlar se é abertura ou fechamento
  const [exibirRelatorio, setExibirRelatorio] = useState(false);
  const [relatorioGerado, setRelatorioGerado] = useState(null);


  useEffect(() => {
    const fetchASGQuestions = async () => {
      try {
        const tipoPergunta = isAbertura ? 'Abertura' : 'Fechamento'; 
        const response = await axios.get(`https://de23-2804-d41-b066-6900-789f-f58e-445e-b3a7.ngrok-free.app/perguntas/4?type=${tipoPergunta}`);

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


const gerarRelatorioPDF = async () => {
  try {
    const today = moment().format('DD/MM/YYYY'); // Obtém a data atual formatada
    const htmlContent = `
      <h1>RELATÓRIO ABERTURA/FECHAMENTO</h1>
      <p><strong>Responsável:</strong> TESTE</p>
      <p><strong>Data:</strong> TESTE</p>
      <h2>Perguntas e Respostas</h2>
      TESTE
      <h2>Observações</h2>
      <p>Aqui você pode adicionar as observações.</p>
      <br/><br/><br/>
      <p style="text-align: right;">__________________<br/>Assinatura</p>
    `;

    const options = {
      html: htmlContent,
      fileName: 'relatorio.pdf',
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    setRelatorioGerado(pdf.filePath);
  } catch (error) {
    console.error('Erro ao gerar o relatório PDF:', error);
  }
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
          <TouchableOpacity onPress={gerarRelatorioPDF}>
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
  },
  buttonText: {
    fontSize: 12,
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
