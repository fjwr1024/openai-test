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

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  console.log(completion);
  console.log(completion.choices[0].message);
}

main();
