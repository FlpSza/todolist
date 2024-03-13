import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';

const AsgDashboard = () => {
  // Estado para armazenar as respostas do usuário
  const [answers, setAnswers] = useState([]);

  // Função para manipular a seleção de uma opção (Sim/Não) para uma pergunta
  const handleOptionPress = (index, option) => {
    // Atualiza o estado das respostas com a nova seleção para a pergunta específica
    const updatedAnswers = [...answers];
    updatedAnswers[index] = option;
    setAnswers(updatedAnswers);
  };

  // Função para manipular a inserção de uma observação para uma pergunta
  const handleObservationChange = (index, observation) => {
    // Atualiza o estado das respostas com a nova observação para a pergunta específica
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], observation };
    setAnswers(updatedAnswers);
  };

  // Função para enviar o checklist
  const handleSubmitChecklist = () => {
    // Implemente a lógica para enviar as respostas do checklist
    console.log('Respostas do Checklist:', answers);
  };

  // Perguntas e opções de resposta (sim/não)
  const questions = [
    {
      question: 'Pergunta 1: Exemplo de pergunta 1?',
      options: ['Sim', 'Não'],
    },
    {
      question: 'Pergunta 2: Exemplo de pergunta 2?',
      options: ['Sim', 'Não'],
    },
    // Adicione mais perguntas conforme necessário
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        {/* Renderização das perguntas */}
        {questions.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {/* Opções de resposta (Sim/Não) */}
            <View style={styles.optionsContainer}>
              {item.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionButton,
                    answers[index] === option ? { backgroundColor: 'green' } : null,
                  ]}
                  onPress={() => handleOptionPress(index, option)}
                >
                  <Text style={styles.optionButtonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Campo de observação */}
            <TextInput
              style={styles.observationInput}
              placeholder="Observações"
              multiline={true}
              value={answers[index]?.observation || ''}
              onChangeText={(text) => handleObservationChange(index, text)}
            />
          </View>
        ))}
      </ScrollView>
      {/* Botão para enviar o checklist */}
      <View style={styles.footer}>
        <Button title="Enviar Checklist" onPress={handleSubmitChecklist} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  observationInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default AsgDashboard;
