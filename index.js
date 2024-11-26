const express = require('express'); //Importando Express
const { GoogleGenerativeAI } = require("@google/generative-ai"); //Importando pacote do Google AI

const app = express(); //Instanciando express
const API_KEY = 'AIzaSyCC4QcO-okFdcecWZBeKiQejBOz83K6T2M'; //Definindo chave de API
const AI = new GoogleGenerativeAI(API_KEY); //Novo objeto de AI
const model = AI.getGenerativeModel({ model: "gemini-1.5-flash" }); //Pegar modelo

const prompt = "gere um texto de 10 parágrafos sobre fome na áfrica, por favor";

(async () => {
    const result = await model.generateContentStream(prompt);

    // Print text as it comes in.
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        process.stdout.write(chunkText);
    }
    //     const result = await model.generateContent(prompt);
    //     console.log(result.response.candidates[0].content.parts[0].text);
})();

