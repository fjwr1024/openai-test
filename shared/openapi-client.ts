import * as dotenv from "dotenv";
import OpenAI, { ClientOptions } from "openai";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("APIキーが設定されていません。");
}

const clientOptions: ClientOptions = {
  apiKey: apiKey,
};

const openaiClient = new OpenAI(clientOptions);

export default openaiClient;
