const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pool = require('./database'); // Importando o pool de conexão
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(cors());

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

// Middleware para parsear o corpo das requisições codificadas em URL
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos
// app.use('/backend', express.static(path.join(__dirname, '../backend/')));
// app.use('/img', express.static(path.join(__dirname, '../img/')));
// app.use('/frontend', express.static(path.join(__dirname, '../frontend/')));

//CHAVE SECRETA PARA AUTENTICAÇÃO
const JWT_SECRET = process.env.JWT_SECRET;




// Middleware para verificar o token de autenticação
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token de autenticação inválido.' });
        }
        req.user = user;
        next();
    });
}

// Rota para login de usuárioa
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    pool.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).send('Erro ao buscar usuário');
        }
        if (results.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const user = results[0];
        
        // Lógica de autenticação com senha em texto simples
        if (user.senha !== senha) {
            return res.status(401).send('Credenciais inválidas');
        }

        // Gerar token JWT incluindo o idSetor no payload
        const tokenPayload = { 
            id: user.idUsuario, 
            email: user.email, 
            idSetor: user.idSetor // Incluindo o idSetor no payload
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

        // Enviar informações do usuário junto com o token
        const userInfo = {
            id: user.idUsuario,
            email: user.email,
            idSetor: user.idSetor,
            nome: user.nome // Inclua quaisquer outras informações do usuário que você deseja enviar
        };

        return res.status(200).send({ token, userInfo });
    });
});

// Endpoint para cadastrar um novo usuário
app.post('/users', async (req, res) => {
    // Extrair informações do usuário do corpo da solicitação
    const { nome, email, senha, idSetor, idLoja } = req.body;

    try {
        // Verificar se a senha está vazia
        if (!senha) {
            return res.status(400).send('Senha não fornecida');
        }
    
        // SQL para inserir o novo usuário no banco de dados
        const sql = 'INSERT INTO usuarios (nome, email, senha, idSetor, idLoja) VALUES (?, ?, ?, ?, ?)';
    
        // Executar a consulta SQL para inserir o usuário
        pool.query(sql, [nome, email, senha, idSetor, idLoja], (err, results) => {
            if (err) {
                console.error('Erro ao inserir o usuário no banco de dados:', err);
                res.status(500).send('Erro ao cadastrar o usuário');
                return;
            }
    
            // Verificar o setor do usuário e redirecionar com base nisso
            if (idSetor === 7) { // assumindo que 7 é o ID do setor 'administrador'
                // Redirecionar para uma rota específica para administradores
                res.status(201).json({ mensagem: 'Cadastro realizado com sucesso - Administrador', redirect: '/admin-home' });
            } else {
                // Redirecionar para uma rota geral para outros setores
                res.status(201).json({ mensagem: 'Cadastro realizado com sucesso', redirect: '/user-home' });
            }
        });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
});

// Rota para obter informações do usuário
app.get('/user-info', authenticateToken, (req, res) => {
    // As informações do usuário, incluindo o idSetor, estão disponíveis no objeto req.user
    const { idSetor } = req.user;
    
    // Aqui você pode buscar outras informações do usuário no banco de dados, se necessário

    // Por fim, você pode enviar as informações do usuário de volta como resposta
    res.status(200).json({ idSetor });
});


// ADMINISTRADOR

//tela vista apenas pelo administrador
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../screens/admin/AdminDashboard.tsx'));
});

// Endpoint para visualizar todas as lojas
app.get('/storelist', (req, res) => {
    const sql = 'SELECT idLoja, nmLoja FROM lojas';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar lojas:', err);
            res.status(500).send('Erro ao buscar lojas');
            return;
        }
        res.status(200).json(results);
    });
});

// Endpoint para visualizar todos os setores
app.get('/sectorlist', (req, res) => {
    const sql = 'SELECT idSetor, nmSetor FROM setores';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar setores:', err);
            res.status(500).send('Erro ao buscar setores');
            return;
        }
        res.status(200).json(results);
    });
});

// Endpoint para buscar a lista de usuários
app.get('/userlist', (req, res) => {
    // Lógica para buscar a lista de usuários no banco de dados
    pool.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            consolnpm install lru-cache
e.error('Erro ao buscar lista de usuários:', err);
            res.status(500).send('Erro ao buscar lista de usuários');
            return;
        }
        res.json(results); // Envia os resultados como resposta
    });
});

// Endpoint para cadastrar uma nova loja
app.post('/lojas', (req, res) => {
    // Extrair informações da loja do corpo da solicitação
    const { nmLoja } = req.body;

    try {
        // SQL para inserir a nova loja no banco de dados
        const sql = 'INSERT INTO lojas (nmLoja) VALUES (?)';

        // Executar a consulta SQL para inserir a loja
        pool.query(sql, [nmLoja], (err, results) => {
            if (err) {
                console.error('Erro ao inserir a loja no banco de dados:', err);
                res.status(500).send('Erro ao cadastrar a loja');
                return;
            }
            res.status(201).send({
                mensagem: 'Loja criada com sucesso',
                nmLoja: nmLoja
            });
        });
    } catch (error) {
        console.error('Erro ao cadastrar a loja:', error);
        res.status(500).send('Erro ao processar o cadastro da loja');
    }
});

// Endpoint para excluir um usuário pelo nome
app.delete('/users/:nome', async (req, res) => {
    const nomeUsuario = req.params.nome;
    try {
        // Excluir o usuário do banco de dados pelo nome
        pool.query('DELETE FROM usuarios WHERE nome = ?', [nomeUsuario], (err, results) => {
            if (err) {
                console.error('Erro ao excluir usuário:', err);
                res.status(500).send('Erro ao excluir usuário');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Usuário não encontrado');
                return;
            }
            res.status(200).send(`Usuário "${nomeUsuario}" excluído com sucesso`);
        });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).send('Erro ao excluir usuário');
    }
});

// Endpoint para excluir uma loja pelo ID
app.delete('/store/:id', async (req, res) => {
    const lojaId = req.params.id;
    try {
        // Verificar se a loja existe
        const lojaExists = await getLojaById(lojaId);
        if (!lojaExists) {
            res.status(404).send('Loja não encontrada');
            return;
        }
        // Excluir a loja do banco de dados
        pool.query('DELETE FROM lojas WHERE idLoja = ?', [lojaId], (err, results) => {
            if (err) {
                console.error('Erro ao excluir loja:', err);
                res.status(500).send('Erro ao excluir loja');
                return;
            }
            res.status(200).send(`Loja com o ID ${lojaId} excluída com sucesso`);
        });
    } catch (error) {
        console.error('Erro ao excluir loja:', error);
        res.status(500).send('Erro ao excluir loja');
    }
});

// Endpoint para excluir um setor pelo ID
app.delete('/sector/:id', async (req, res) => {
    const setId = req.params.id;
    try {
        // Verificar se o setor existe
        const setorExists = await getSetorById(setId);
        if (!setorExists) {
            res.status(404).send('Setor não encontrado');
            return;
        }
        // Excluir o setor do banco de dados
        pool.query('DELETE FROM setores WHERE idSetor = ?', [setId], (err, results) => {
            if (err) {
                console.error('Erro ao excluir setor:', err);
                res.status(500).send('Erro ao excluir setor');
                return;
            }
            res.status(200).send(`Setor com o ID ${setId} excluído com sucesso`);
        });
    } catch (error) {
        console.error('Erro ao excluir setor:', error);
        res.status(500).send('Erro ao excluir setor');
    }
});

// Endpoint para cadastrar um novo setor
app.post('/setores', async (req, res) => {
    // Extrair informações do setor do corpo da solicitação
    const { nmSetor } = req.body;

    try {
        // SQL para inserir o novo setor no banco de dados
        const sql = 'INSERT INTO setores (nmSetor) VALUES (?)';

        // Executar a consulta SQL para inserir o setor
        pool.query(sql, [nmSetor], (err, results) => {
            if (err) {
                console.error('Erro ao inserir o setor no banco de dados:', err);
                res.status(500).send('Erro ao cadastrar o setor');
                return;
            }
            res.status(201).send({
                mensagem: 'Setor cadastrado com sucesso',
                nmSetor: nmSetor
            });
        });
    } catch (error) {
        console.error('Erro ao cadastrar o setor:', error);
        res.status(500).send('Erro ao processar o cadastro do setor');
    }
});



//Perguntas e Respostas

// Tabela perguntas: Armazena as perguntas do checklist, com informações como o texto da pergunta e o tipo de resposta esperada (por exemplo, "Sim/Não", "Texto livre", etc.).

// Tabela questionarios: Representa um conjunto de perguntas agrupadas para um determinado setor. Cada questionário possui um título e está associado a um setor específico.

// Tabela respostas: Armazena as respostas dos usuários às perguntas do checklist. Cada resposta está associada a uma pergunta específica, a um usuário e contém o texto da resposta.




// Endpoint para buscar todas as perguntas
app.get('/perguntas', async (req, res) => {
    try {
        const perguntas =  pool.query('SELECT * FROM perguntas');
        res.json(perguntas);
    } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
        res.status(500).json({ error: 'Erro ao buscar perguntas' });
    }
});

  
  
// Endpoint para buscar todas as perguntas de um setor específico e tipo específico (Abertura ou Fechamento)
app.get('/perguntas/:idSetor', async (req, res) => {
    const { idSetor } = req.params;
    const { type } = req.query; // Adicionando um novo parâmetro de consulta para o tipo de pergunta

    let query = 'SELECT * FROM perguntas WHERE idSetor = ?';
    const queryParams = [idSetor];

    // Se um tipo foi especificado, inclua-o na consulta
    if (type) {
        query += ' AND tipoPergunta = ?';
        queryParams.push(type);
    }

    try {
        pool.query(query, queryParams, (error, results) => {
            if (error) {
                console.error(`Erro ao buscar perguntas do setor ${idSetor} e tipo ${type}:`, error);
                res.status(500).json({ error: `Erro ao buscar perguntas do setor ${idSetor} e tipo ${type}` });
                return;
            }
            res.json(results); // Enviar os resultados como resposta
        });
    } catch (error) {
        console.error(`Erro ao buscar perguntas do setor ${idSetor} e tipo ${type}:`, error);
        res.status(500).json({ error: `Erro ao buscar perguntas do setor ${idSetor} e tipo ${type}` });
    }
});



  

// Endpoint para cadastrar uma nova pergunta
app.post('/perguntas', (req, res) => {
    const { textoPergunta, idSetor, tipoPergunta } = req.body;
  
    if (!textoPergunta || !idSetor || !tipoPergunta) {
      return res.status(400).json({ error: 'Texto da pergunta, ID do setor e tipo de pergunta são obrigatórios.' });
    }
  
    // Verifica se o ID do setor fornecido é válido
    const setores = {
      1: 'salao',
      2: 'bar',
      3: 'caixa',
      4: 'ASG',
      5: 'cozinha',
      6: 'producao',
      7: 'administrador'
    };
    if (!setores[idSetor]) {
      return res.status(400).json({ error: 'ID do setor inválido.' });
    }
  
    // Realiza a consulta SQL para inserir a nova pergunta no banco de dados
    pool.query('INSERT INTO perguntas (textoPergunta, idSetor, tipoPergunta) VALUES (?, ?, ?)', [textoPergunta, idSetor, tipoPergunta], (error, results, fields) => {
      if (error) {
        console.error('Erro ao cadastrar pergunta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
      }
      res.status(201).json({ message: 'Pergunta cadastrada com sucesso.' });
    });
  });

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
