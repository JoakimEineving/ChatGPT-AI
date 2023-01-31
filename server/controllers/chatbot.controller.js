import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default class ChatbotController {
  static async generateResponse(model, prompt, temperature) {
    try {
      const response = await openai.createCompletion({
        model: model,
        prompt: `${prompt}`,
        temperature: temperature,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
      return response.data.choices[0].text;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

