import { GoogleGenerativeAI } from "@google/generative-ai";
import { envTranformed } from "../env";

const geminiKey = envTranformed.GOOGLE_GEMINI_API_KEY

export default async function sendMessageToAi(prompt: string, history: []) {
    if (!geminiKey) throw new Error("Chave de API nao encontrada.");

    const genai = new GoogleGenerativeAI(geminiKey)
    const model = genai.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
    const chat = model.startChat({ history })

    try {
        const result = await chat.sendMessage(prompt)
        const responseText = result.response.text;
        return responseText;
    }catch (e) {
        console.error("Ocorreu um erro ao iniciar o chat:", (e as Error).message)
        return null
    }

}