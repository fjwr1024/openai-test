import * as dotenv from "dotenv";
import * as fs from "fs";
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
  const file = await openai.files.create({
    file: fs.createReadStream("mydata.jsonl"),
    purpose: "fine-tune",
  });
}

main();
