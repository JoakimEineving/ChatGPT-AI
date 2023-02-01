import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatbot = async (req, res) => {
  try {
    const model = req.body.model;
    const prompt = req.body.prompt;
    const temperature = parseFloat(req.body.temperature);
    const response = await openai.createCompletion({
      model: model,
      prompt: `${prompt}`,
      temperature: temperature,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    }
    );
    res.status(200).send({ bot: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(500).send(error || "Something went wrong");
  }
}
export default chatbot;

