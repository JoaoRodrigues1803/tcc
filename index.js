import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/sensor", async (req, res) => {
  const resultado = await fetch("https://blcgszqtzogwdwbhgbwq.supabase.co/rest/v1/dados_sensor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_SERVICE_ROLE,
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE}`
    },
    body: JSON.stringify(req.body)
  });

  res.sendStatus(resultado.status);
});

app.listen(3000);
