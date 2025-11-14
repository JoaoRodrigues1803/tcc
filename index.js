import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar o JSON no corpo da requisição
app.use(express.json());

app.post('/sensor', async (req, res) => {
  try {
    const { bpm, latitude, longitude } = req.body;
    const jsonData = {
      mac_placa: "00:1A:2B:3C:4D:5E",
      data: new Date().toISOString(),
      valores: {
        frequencia: bpm,
        latitude: latitude,
        longitude: longitude,
      }
    };

    // Enviar os dados para a Supabase
    const supabaseResponse = await fetch("https://blcgszqtzogwdwbhgbwq.supabase.co/rest/v1/dados_sensor", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_API_KEY,  // Usar uma variável de ambiente para segurança
        'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`
      },
      body: JSON.stringify(jsonData)
    });

    if (supabaseResponse.ok) {
      res.status(200).send('Dados enviados para a Supabase com sucesso!');
    } else {
      res.status(500).send('Erro ao enviar dados para a Supabase.');
    }
  } catch (error) {
    res.status(500).send('Erro no servidor: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
