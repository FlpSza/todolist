import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment'; // Para manipulação de datas

const Relatorio = ({ usuarioLogado, respostas }) => {
  const [relatorioGerado, setRelatorioGerado] = useState(null);

  const gerarRelatorioPDF = async () => {
    try {
      const today = moment().format('DD/MM/YYYY'); // Obtém a data atual formatada
      const htmlContent = `
        <h1>RELATÓRIO ABERTURA/FECHAMENTO</h1>
        <p><strong>Responsável:</strong> ${usuarioLogado}</p>
        <p><strong>Data:</strong> ${today}</p>
        <h2>Perguntas e Respostas</h2>
        ${respostas.map((pergunta, index) => `
          <p><strong>Pergunta ${index + 1}:</strong> ${pergunta.pergunta}</p>
          <p><strong>Resposta:</strong> ${pergunta.resposta}</p>
        `).join('')}
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

  return (
    <View>
      <TouchableOpacity onPress={gerarRelatorioPDF}>
        <Text>Gerar Relatório</Text>
      </TouchableOpacity>
      {relatorioGerado && (
        <TouchableOpacity onPress={() => alert(`Relatório gerado em: ${relatorioGerado}`)}>
          <Text>Abrir Relatório</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Relatorio;
