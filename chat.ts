import * as dotenv from "dotenv";
import OpenAI, { ClientOptions } from "openai";
import openaiClient from "./shared/openapi-client";

async function sendMessage() {
  const completion = await openaiClient.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion);
  console.log(completion.choices[0]);
  console.log(completion.choices[0].message);
}

sendMessage();
