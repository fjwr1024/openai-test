import * as dotenv from "dotenv";
import * as fs from "fs";
import util from "util";
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

function encodeImageToBase64(filePath: any) {
  return fs.readFileSync(filePath, { encoding: "base64" });
}

async function main() {
  const imagePath = "./images/sample.png";

  const base64Image = encodeImageToBase64(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "test" },
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
  console.log(util.inspect(response, { showHidden: false, depth: null, colors: true }));
  console.log(util.inspect(response.choices[0], { showHidden: false, depth: null, colors: true }));
}
main();
