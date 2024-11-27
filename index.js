//CHARLES CHEVERS 0.1.4

const readline = require('readline'); //Importando readline
const express = require('express'); //Importando Express
const { GoogleGenerativeAI } = require("@google/generative-ai"); //Importando pacote do Google AI

const app = express(); //Instanciando express
const API_KEY = 'AIzaSyCC4QcO-okFdcecWZBeKiQejBOz83K6T2M'; //Definindo chave de API
const AI = new GoogleGenerativeAI(API_KEY); //Instanciando Google AI
const model = AI.getGenerativeModel({ model: "gemini-1.5-flash" }); //Gerar modelo de texto

//Instanciando readline para chat via console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Criando um chat com o modelo, sem histórico
const chat = model.startChat({ history: [] });
async function handleChat() { //Nova função para chat, com pergunta e resposta do usuário
    rl.question("Usuário: ", async (userInput) => { //Faz uma pergunta via rlcom o input do usuário
        try {
            ///Manda no chat do Gemini e printa a response
            const result = await chat.sendMessage(userInput);
            console.log(`Charles: ${result.response.text()}`);
            
            //Repete a função
            handleChat();
        } catch (err) {
            console.error("Erro ao processar chat: ", err);
            rl.close();
        }
    });
}

app.listen(3000, () => {
    console.log(`Chat iniciado`);
    handleChat();
});