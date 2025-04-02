// Está em JS, pode ser mudado para TS para seguir a mesma lógica do projeto

import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Esse startChat consiste na tentativa inicial de ser integrado ao gifted-chat, que pode ser mudado depois
async function startChat(prompt, history = []) {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error("Chave de API não encontrada. Verifique o arquivo .env ou as variáveis de ambiente.");
    }

    const genai = new GoogleGenAI(apiKey);
    const model = await genai.models.generateContent("gemini-1.5-pro-latest");
    const chat = model.startChat({ history });


    console.log("\nChat iniciado. Digite 'fim' para encerrar.\n");

    process.stdin.on("data", async (data) => {
        const prompt = data.toString().trim();
        if (prompt.toLowerCase() === "fim") {
            console.log("Encerrando a conversa.");
            process.exit();
        }

        try {
            const response = await chat.sendMessage(prompt);
            console.log(`Resposta: ${response.text}`);
        } catch (error) {
            console.error("Erro ao obter resposta:", error);
        }
    });
}

export { startChat };