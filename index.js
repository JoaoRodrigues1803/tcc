// index.js
require('dotenv').config();  // Para carregar as variáveis do .env
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

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
  res.json(data);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
