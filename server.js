// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const port = process.env.PORT || 8088;

// Middleware para permitir CORS e processar JSON
app.use(cors());
app.use(bodyParser.json());

// Substitua com o token do seu bot
const TELEGRAM_BOT_TOKEN = "7644860112:AAFwJcquUsjGl_rxVoofN7pqALlorD02epE";  // Substitua pelo token correto

// Substitua com o ID correto do seu chat (grupo ou usuário)
const TELEGRAM_CHAT_ID = "6765523988";  // Substitua com o ID correto

// Rota principal para servir a página HTML (opcional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para receber a localização via POST e enviar para o Telegram
app.post("/send-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  // Verifica se as coordenadas foram enviadas
  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Latitude e Longitude são obrigatórios." });
  }

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}`;

  try {
    // Envia a localização para o Telegram
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }
    );

    console.log("Resposta do Telegram:", response.data); // Resposta do Telegram
    res.status(200).json({ success: true, message: "Localização enviada com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar para o Telegram:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao enviar a localização para o Telegram.",
    });
  }
});

// Inicia o servidor
app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});
