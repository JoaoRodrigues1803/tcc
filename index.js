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

//endpoint para o mapa
app.get('/localizacao', async (req, res)=>{
  const { localizacao, error } = await supabase
  .from('coleta_de_dados')
  .select('latitude', 'longitude');

  if (aerror){
    return res.status(500).json({error: error.message});
  }
  res.status(200).json(localizacao)
}

)

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
