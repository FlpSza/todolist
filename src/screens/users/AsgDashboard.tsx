import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AsgDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Função para buscar as perguntas do questionário associado ao setor do usuário
    const fetchQuestions = async () => {
      try {
        // Substitua este trecho de código com sua lógica real para buscar as perguntas do banco de dados
        const response = await axios.get(`URL_PARA_BUSCAR_PERGUNTAS_DO_QUESTIONARIO_DO_SETOR_${idDoSetor}`);
        setQuestions(response.data); // Define as perguntas obtidas na resposta
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
        // Trate o erro adequadamente (exibindo uma mensagem de erro, por exemplo)
      }
    };

    // Chama a função para buscar as perguntas ao carregar o componente
    fetchQuestions();
  }, []);

  // Função para atualizar a resposta do usuário para uma determinada pergunta
  const handleAnswerChange = (questionId, text) => {
    setAnswers({ ...answers, [questionId]: text });
  };

  // Função para enviar as respostas do checklist para o servidor
  const submitChecklist = async () => {
    try {
      // Substitua este trecho de código com sua lógica real para enviar as respostas para o servidor
      const response = await axios.post('URL_PARA_ENVIAR_RESPOSTAS', {
        respostas: answers,
      });
      Alert.alert('Sucesso', 'Respostas enviadas com sucesso');
      // Lógica adicional após o envio bem-sucedido, se necessário
    } catch (error) {
      console.error('Erro ao enviar respostas do checklist:', error);
      Alert.alert('Erro', 'Erro ao enviar respostas do checklist. Por favor, tente novamente.');
      // Trate o erro adequadamente (exibindo uma mensagem de erro, por exemplo)
    }
  };

  // Função para renderizar cada pergunta do checklist
  const renderQuestion = (question) => (
    <View key={question.idPergunta} style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.textoPergunta}</Text>
      <TextInput
        style={styles.answerInput}
        placeholder="Resposta"
        value={answers[question.idPergunta] || ''}
        onChangeText={(text) => handleAnswerChange(question.idPergunta, text)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checklist</Text>
      {questions.map(renderQuestion)}
      <Button title="Enviar Checklist" onPress={submitChecklist} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default AsgDashboard;
