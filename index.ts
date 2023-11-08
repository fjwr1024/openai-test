import * as dotenv from "dotenv";
import OpenAI, { ClientOptions } from "openai";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("APIキーが設定されていません。");
}

console.log(apiKey);

const clientOptions: ClientOptions = {
  apiKey: apiKey,
};

const openai = new OpenAI(clientOptions);

async function sendMessage() {
  try {
    const completionRequest = {
      model: "gpt-3.5-turbo",
      prompt: "Hello. Test AI Chatbot.",
    };

    const response = await openai.completions.create(completionRequest);

    // console.log(response.data.choices[0].text.trim());
    console.log(response);
  } catch (error) {
    console.error("error:", error);
  }
}

sendMessage();
