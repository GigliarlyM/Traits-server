// Está em JS, pode ser mudado para TS para seguir a mesma lógica do projeto

const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// Esse startChat consiste na tentativa inicial de ser integrado ao gifted-chat, que pode ser mudado depois
async function startChat(prompt, history = []) {

    if (prompt.toLowerCase() === "fim") {
        return "Chat encerrado";
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("Chave de API não encontrada. Verifique o arquivo .env ou as variáveis de ambiente.");
    }

    const genai = new GoogleGenerativeAI(apiKey);
    const model = genai.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const chat = model.startChat({ history });

    try {
        const result = await chat.sendMessage(prompt);
        const responseText = result.response.text;
        console.log(`Resposta: ${responseText}`);
    } catch (error) {
        console.error("Erro ao obter resposta:", error);
    }
}

module.exports = { startChat };