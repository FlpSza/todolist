const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = vfsFonts.pdfMake.vfs;

const generatePDF = (data) => {
    const documentDefinition = {
      content: [
        { text: 'Relatório', style: 'header' },
        { text: '\n' },
        { text: `Nome: ${data.name}` },
        { text: `Idade: ${data.age}` },
        // Adicione mais informações conforme necessário
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    return pdfDoc;
  };

  module.exports = generatePDF;




  

  const generatePDF = require('./generatePDF');

app.get('/gerar-pdf', (req, res) => {
  // Suponha que você tenha os detalhes do usuário logado e a data atual disponíveis
  const userDetails = {
    nome: 'Usuário Exemplo',
    // Adicione mais detalhes do usuário conforme necessário
  };
  const dataAtual = new Date().toLocaleDateString();
  const horaAtual = new Date().toLocaleTimeString();

  // Dados das perguntas e respostas - substitua isso com seus próprios dados
  const perguntasERespostas = [
    { pergunta: 'Pergunta 1', resposta: 'Resposta 1' },
    { pergunta: 'Pergunta 2', resposta: 'Resposta 2' },
    // Adicione mais perguntas e respostas conforme necessário
  ];

  // Observação - substitua isso com a observação real
  const observacao = 'Nenhuma observação fornecida.';

  // Gere o PDF usando as informações fornecidas
  const pdfDoc = generatePDF(userDetails, dataAtual, horaAtual, perguntasERespostas, observacao);

  // Envie o PDF como resposta
  pdfDoc.getBuffer((buffer) => {
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=relatorio.pdf',
    });
    res.end(buffer);
  });
});
