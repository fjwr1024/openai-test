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

function encodeImageToBase64(filePath) {
  return fs.readFileSync(filePath, { encoding: "base64" });
}

async function main() {
  const imagePath = "./images/sample.png";

  const base64Image = encodeImageToBase64(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What are in these images? Is there any difference between them?" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });
  console.log(response);
  console.log(response.choices[0]);
}
main();
