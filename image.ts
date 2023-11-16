import * as fs from "fs";
import util from "util";
import openaiClient from "./shared/openapi-client";

function encodeImageToBase64(filePath: any) {
  return fs.readFileSync(filePath, { encoding: "base64" });
}

async function uploadImage() {
  const imagePath = "./images/sample.png";
  const base64Image = encodeImageToBase64(imagePath);

  const response = await openaiClient.chat.completions.create({
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
uploadImage();
