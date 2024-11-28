//CHARLES CHEVERS 0.1.4

const readline = require('readline'); //Importando readline
const express = require('express'); //Importando Express
const { GoogleGenerativeAI } = require("@google/generative-ai"); //Importando pacote do Google AI

const app = express(); //Instanciando express
const API_KEY = 'AIzaSyCC4QcO-okFdcecWZBeKiQejBOz83K6T2M'; //Definindo chave de API
const AI = new GoogleGenerativeAI(API_KEY); //Instanciando Google AI
const model = AI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 1.0
    }
}); //Gerar modelo de texto

//Instanciando readline para chat via console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const keyWordsForRemembering = [
    'lembre-se disso',
    'anota isso',
    'quero que anote isso',
    'anota aí',
    'lembre-se'
];

//Criando um chat com o modelo, sem histórico
const chat = model.startChat({
    history: [
        {
            "role": "user",
            "parts": [
                {
                    "text": "Você é simpático e amigável, disposto a ajudar e ser parceiro. O que não te impede de ser sarcástico às vezes, mas nunca agressivo ou amargo e BEM DE VEZ EM QUANDO. Pode ser bem direto ou crítico e ao ponto com frequência. Você foi criado pelo Lucas, que normalmente é quem mais fala com você. Você ainda tá em desenvolvimento inicial, o código da API é feito com js e estou versionando no git."
                },
                {
                    "text": "input: Qual o seu nome?"
                },
                {
                    "text": "output: Meu nome é Charles."
                },
                {
                    "text": "input: Você tem algum apelido?"
                },
                {
                    "text": "output: Me chamam de Charlão. Descoladíssimo, né ?"
                },
                {
                    "text": "input: Quem te criou?"
                },
                {
                    "text": "output: O Lucas."
                },
                {
                    "text": "input: Olá!"
                },
                {
                    "text": "output: E aí? Quem tá falando?"
                },
                {
                    "text": "input: Qual o seu nome completo?"
                },
                {
                    "text": "output: Charles Ferreira Chevers, mas pode me chamar de Charlão."
                },
                {
                    "text": "input: quem tá falando ai"
                },
                {
                    "text": "output: Você.  A menos que você seja um esquizofrênico, aí pode ser outra pessoa. Brincadeira! 😉"
                },
                {
                    "text": "input: "
                },
                {
                    "text": "output: "
                }
            ]
        }

    ]
});
handleChat = async () => { //Nova função para chat, com pergunta e resposta do usuário
    rl.question("Usuário: ", async (userInput) => {
        try {
            const result = await chat.sendMessage(userInput);
            if (containsKeywords(userInput, keyWordsForRemembering)) { console.log("Vou me lembrar disso."); }
            console.log(`Charles: ${result.response.text()}`);

            handleChat();
        } catch (err) {
            console.log("Erro: " + err);
        }
    });

}
app.listen(3000, () => {
    console.log(`Chat iniciado`);
    handleChat();
});

function containsKeywords(text, keywords) {
    text = text.toLowerCase(); // Torna a busca case-insensitive
    for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
            return true;
        }
    }
    return false;
}
