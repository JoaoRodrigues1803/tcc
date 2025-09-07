// index.js
//require('dotenv').config();  // Para carregar as variáveis do .env
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const req = require('express/lib/request');
dotenv.config();  // Carrega as variáveis do .env



const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Configurando o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

// Endpoint de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Endpoint para pegar dados do Supabase
app.get('/teste', async (req, res) => {
  const { data, error } = await supabase
    .from('teste') // Substitua pelo nome da sua tabela
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
});

//endpoint para verificar o usuario
app.get('/usuario', async (req, res) => {
  try {
    const { data: usuario, error } = await supabase
      .from('usuario')  // Nome da tabela correta
      .select('*')
      .eq('nome', {nome});  // Filtra pelo ID do usuário
      
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(usuario);  // Retorna os dados do usuário
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

//endpoint para o mapa
app.get('/localizacao', async (req, res) => {
  try {
    const { data: localizacao, error } = await supabase
      .from('coleta_de_dados')  // Nome da tabela correta
      .select('latitude, longitude');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(localizacao);  // Retorna a localização
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

app.get('/batimentos', async (req, res) => {
  try {
    const { data: batimentos, error } = await supabase
      .from('coleta_de_dados')  // Nome da tabela correta
      .select('frequencia_cardiaca');

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(batimentos);  // Retorna os batimentos
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

app.post('/cadastroPet', async (req, res) => {
  try {
    const { nome, raca, idade, peso, sexo, porte, vacinado, castrado, observacoes } = req.body;
    const { data, error } = await supabase
      .from('pets')  // Nome da tabela correta
      .insert([{ nome, raca, idade, peso, sexo, porte, vacinado, castrado, observacoes }]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);  // Retorna os dados do pet cadastrado
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});
      

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
