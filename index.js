const readline = require("readline"); //Importando readline
const express = require("express"); //Importando Express
const { GoogleGenerativeAI } = require("@google/generative-ai"); //Importando pacote do Google AI
const fs = require('fs');
const { customsearch } = require('@googleapis/customsearch');

const date = Date().toLocaleString();
const app = express(); //Instanciando express
const API_KEY = "AIzaSyCC4QcO-okFdcecWZBeKiQejBOz83K6T2M"; //Definindo chave de API
const AI = new GoogleGenerativeAI(API_KEY); //Instanciando Google AI
const memory = require("./memory.json");
const model = AI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1.0,
  },
});

//Instanciando readline para chat via console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Criando um chat com o modelo, sem histórico
const chat = model.startChat({ history: memory });

handleChat = async () => {
  //Nova função para chat, com pergunta e resposta do usuário
  rl.question("Usuário: ", async (userInput) => {
    try {
      const result = await chat.sendMessage(`[${date}] - ${userInput}`);
      if (containsKeywords(userInput, keyWordsForRemembering)) {
        remember(userInput, result.response.text());
      }
      console.log(`Charles: ${result.response.text()}`);
      handleChat();
    } catch (err) {

      console.log("Erro: " + err);
    }
  });
};

app.listen(3000, () => {
  console.log(`Chat iniciado`);
  handleChat();
});

const containsKeywords = (text, keywords) => {
  text = text.toLowerCase(); // Torna a busca case-insensitive
  for (const keyword of keywords) {
    if (text.includes(keyword.toLowerCase())) {

      return true;
    }
  }
  return false;
};

const keyWordsForRemembering = [
  "lembre-se disso",
  "anota isso",
  "quero que anote isso",
  "anota aí",
  "lembre-se",
  "se lembre"
];

function remember(input, output) {
  fs.readFile('./memory.json', 'utf8', (err, data) => {
    if (err) console.error(err);

    jsonMemory = JSON.parse(data);
    jsonMemory[0].parts.push(
      {
        "text": `input: ${input}`
      },
      {
        "text": `output: ${output}`
      }
    );

    fs.writeFile('./memory.json', JSON.stringify(jsonMemory, null, 2), err => {
      if (err) console.error(err);
    });
  });
}