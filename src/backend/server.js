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
    const sql = 'SELECT * FROM Usuarios WHERE email = ?';

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

        // Verificar o setor do usuário e enviar o redirecionamento
        if (user.idSetor === 7) {
            return res.status(200).send({ redirectTo: '/admin-dashboard', token });
        } else if (user.idSetor === 1) {
            return res.status(200).send({ redirectTo: '/salao-dashboard', token });
        } else if (user.idSetor === 2) {
            return res.status(200).send({ redirectTo: '/bar-dashboard', token });
        } else if (user.idSetor === 3) {
            return res.status(200).send({ redirectTo: '/caixa-dashboard', token });
        } else if (user.idSetor === 4) {
            return res.status(200).send({ redirectTo: '/asg-dashboard', token });
        } else if (user.idSetor === 5) {
            return res.status(200).send({ redirectTo: '/coz-dashboard', token });
        } else if (user.idSetor === 6) {
            return res.status(200).send({ redirectTo: '/prod-dashboard', token });
        } else {
            console.error('Setor de usuário desconhecido:', user.idSetor);
            return res.status(500).send('Erro interno do servidor');
        }
    });
});

// Endpoint para cadastrar um novo usuário
app.post('/users', async (req, res) => {
    // Extrair informações do usuário do corpo da solicitação
    const { nome, email, senha, idSetor, idLoja } = req.body;
    const setoresNumeros = {
        salao: 1,
        bar: 2,
        caixa: 3,
        ASG: 4,
        cozinha: 5,
        producao: 6,
        administrador: 7
    };

    try {
        // Verificar se a senha está vazia
        if (!senha) {
            return res.status(400).send('Senha não fornecida');
        }

        // Gerar hash da senha usando o bcrypt
        // const hashedSenha = await bcrypt.hash(senha, 10);

        // SQL para inserir o novo usuário no banco de dados
        const sql = 'INSERT INTO Usuarios (nome, email, senha, idSetor, idLoja) VALUES (?, ?, ?, ?, ?)';

        // Obtendo o nome do setor da requisição
        const nomeSetor = req.body.idSetor;

        // Convertendo o nome do setor em seu número correspondente
        const idSetor = setoresNumeros[nomeSetor];

        // Executar a consulta SQL para inserir o usuário
        pool.query(sql, [nome, email, senha, idSetor, idLoja], (err, results) => {
            if (err) {
                console.error('Erro ao inserir o usuário no banco de dados:', err);
                res.status(500).send('Erro ao cadastrar o usuário');
                return;
            }

            // Verificar o setor do usuário e redirecionar com base nisso
            if (nomeSetor === 'administrador') {
                // Redirecionar para uma rota específica para administradores
                res.status(201).json({ mensagem: 'Cadastro realizado com sucesso - Administrador', redirect: '/admin-home' });
            } else {
                // Redirecionar para uma rota geral para outros setores
                res.status(201).json({ mensagem: 'Cadastro realizado com sucesso', redirect: '/user-home' });
            }
        });
    } catch (error) {
        console.error('Erro ao gerar hash da senha:', error);
        res.status(500).send('Erro ao processar a senha');
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

// Endpoint para visualizar todos os usuários
app.get('/users', (req, res) => {
    app.use('/frontend', express.static(path.join(__dirname, '../frontend/')));
});

// Endpoint para visualizar todas as lojas
app.get('/lojas', (req, res) => {
    res.sendFile((path.join(__dirname, '../frontend/cadastroLoja/index.html')))
});

// Endpoint para visualizar todos os setores
app.get('/setores', (req, res) => {
    res.sendFile((path.join(__dirname, '../frontend/cadastroSetor/index.html')))
});





















// Endpoint para buscar a lista de usuários
app.get('/userlist', (req, res) => {
    // Lógica para buscar a lista de usuários no banco de dados
    pool.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar lista de usuários:', err);
            res.status(500).send('Erro ao buscar lista de usuários');
            return;
        }
        res.json(results); // Envia os resultados como resposta
    });
});


app.get('/usersCad', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/cadastroUsuario/cadastro.html'))
    app.use('/frontend', express.static(path.join(__dirname, '../frontend/')));
});

// Endpoint para visualizar detalhes de um usuário pelo ID
app.get('/users/:id', (req, res) => {
    // const userId = req.params.id;
    // // Lógica para buscar os detalhes do usuário pelo ID no banco de dados
    // pool.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [userId], (err, results) => {
    //     if (err) {
    //         console.error('Erro ao buscar detalhes do usuário:', err);
    //         res.status(500).send('Erro ao buscar detalhes do usuário');
    //         return;
    //     }
    //     if (results.length === 0) {
    //         res.status(404).send('Usuário não encontrado');
    //         return;
    //     }
    //     const user = results[0];
    //     res.status(200).json(user);
    // });
});



// Endpoint para excluir um usuário pelo nome
app.delete('/users/:nome', async (req, res) => {
    const nomeUsuario = req.params.nome;
    try {
        // Excluir o usuário do banco de dados pelo nome
        pool.query('DELETE FROM Usuarios WHERE nome = ?', [nomeUsuario], (err, results) => {
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


// Endpoint para buscar a lista de usuários disponíveis para exclusão/
app.get('/usuariosParaExcluir', (req, res) => {
    // Consulta SQL para buscar os usuários disponíveis para exclusão
    const sql = 'SELECT nome FROM Usuarios';

    // Executar a consulta SQL para obter os usuários
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários para exclusão:', err);
            res.status(500).send('Erro ao buscar usuários para exclusão');
            return;
        }

        // Enviar a lista de usuários como resposta
        res.status(200).json(results);
    });
});


// Endpoint para editar um usuário pelo ID
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    try {
        // Verificar se o usuário existe
        const userExists = await getUserById(userId);
        if (!userExists) {
            res.status(404).send('Usuário não encontrado');
            return;
        }
        // Atualizar os dados do usuário no banco de dados
        pool.query('UPDATE Usuarios SET ? WHERE idUsuario = ?', [newData, userId], (err, results) => {
            if (err) {
                console.error('Erro ao editar usuário:', err);
                res.status(500).send('Erro ao editar usuário');
                return;
            }
            res.status(200).send(`Usuário com o ID ${userId} editado com sucesso`);
        });
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        res.status(500).send('Erro ao editar usuário');
    }
});

// Função utilitária para buscar um usuário pelo ID
async function getUserById(userId) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [userId], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results.length > 0);
        });
    });
}


//Tela vista pelos usuarios normais
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/main/main.html'));
});

// Endpoint para visualizar todos os setores
app.get('/setores', (req, res) => {
    res.sendFile((path.join(__dirname, '../frontend/cadastroSetor/index.html')))
});






















// Endpoint para visualizar detalhes de uma loja pelo ID
app.get('/lojas/:id', (req, res) => {
    const lojaId = req.params.id;
    // Lógica para buscar os detalhes da loja pelo ID no banco de dados
    pool.query('SELECT * FROM Lojas WHERE idLoja = ?', [lojaId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar detalhes da loja:', err);
            res.status(500).send('Erro ao buscar detalhes da loja');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Loja não encontrada');
            return;
        }
        const loja = results[0];
        res.status(200).json(loja);
    });
});

// Endpoint para cadastrar uma nova loja
app.post('/lojas', (req, res) => {
    // Extrair informações da loja do corpo da solicitação
    const { nmLoja } = req.body;

    try {
        // SQL para inserir a nova loja no banco de dados
        const sql = 'INSERT INTO Lojas (nmLoja) VALUES (?)';

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

// Endpoint para editar uma loja pelo ID
app.put('/lojas/:id', async (req, res) => {
    const lojaId = req.params.id;
    const newData = req.body;
    try {
        // Verificar se a loja existe
        const lojaExists = await getLojaById(lojaId);
        if (!lojaExists) {
            res.status(404).send('Loja não encontrada');
            return;
        }
        // Atualizar os dados da loja no banco de dados
        pool.query('UPDATE Lojas SET ? WHERE idLoja = ?', [newData, lojaId], (err, results) => {
            if (err) {
                console.error('Erro ao editar loja:', err);
                res.status(500).send('Erro ao editar loja');
                return;
            }
            res.status(200).send(`Loja com o ID ${lojaId} editada com sucesso`);
        });
    } catch (error) {
        console.error('Erro ao editar loja:', error);
        res.status(500).send('Erro ao editar loja');
    }
});

// Endpoint para excluir uma loja pelo ID
app.delete('/lojas/:id', async (req, res) => {
    const lojaId = req.params.id;
    try {
        // Verificar se a loja existe
        const lojaExists = await getLojaById(lojaId);
        if (!lojaExists) {
            res.status(404).send('Loja não encontrada');
            return;
        }
        // Excluir a loja do banco de dados
        pool.query('DELETE FROM Lojas WHERE idLoja = ?', [lojaId], (err, results) => {
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

// Função utilitária para buscar uma loja pelo ID
async function getLojaById(lojaId) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Lojas WHERE idLoja = ?', [lojaId], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results.length > 0);
        });
    });
}



// Endpoint para visualizar detalhes de um setor pelo ID
app.get('/setores/:id', (req, res) => {
    const setId = req.params.id;
    // Lógica para buscar os detalhes do setor pelo ID no banco de dados
    pool.query('SELECT * FROM Setores WHERE idSetor = ?', [setId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar detalhes do setor:', err);
            res.status(500).send('Erro ao buscar detalhes do setor');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Setor não encontrado');
            return;
        }
        const setor = results[0];
        res.status(200).json(setor);
    });
});

// Endpoint para editar um setor pelo ID
app.put('/setores/:id', async (req, res) => {
    const setId = req.params.id;
    const newData = req.body;
    try {
        // Verificar se o setor existe
        const setorExists = await getSetorById(setId);
        if (!setorExists) {
            res.status(404).send('Setor não encontrado');
            return;
        }
        // Atualizar os dados do setor no banco de dados
        pool.query('UPDATE Setores SET ? WHERE idSetor = ?', [newData, setId], (err, results) => {
            if (err) {
                console.error('Erro ao editar setor:', err);
                res.status(500).send('Erro ao editar setor');
                return;
            }
            res.status(200).send(`Setor com o ID ${setId} editado com sucesso`);
        });
    } catch (error) {
        console.error('Erro ao editar setor:', error);
        res.status(500).send('Erro ao editar setor');
    }
});

// Endpoint para cadastrar um novo setor
app.post('/setores', async (req, res) => {
    // Extrair informações do setor do corpo da solicitação
    const { nmSetor } = req.body;

    try {
        // SQL para inserir o novo setor no banco de dados
        const sql = 'INSERT INTO Setores (nmSetor) VALUES (?)';

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

// Endpoint para excluir um setor pelo ID
app.delete('/setores/:id', async (req, res) => {
    const setId = req.params.id;
    try {
        // Verificar se o setor existe
        const setorExists = await getSetorById(setId);
        if (!setorExists) {
            res.status(404).send('Setor não encontrado');
            return;
        }
        // Excluir o setor do banco de dados
        pool.query('DELETE FROM Setores WHERE idSetor = ?', [setId], (err, results) => {
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

// Função utilitária para buscar um setor pelo ID
async function getSetorById(setId) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Setores WHERE idSetor = ?', [setId], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results.length > 0);
        });
    });
};

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
