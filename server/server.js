import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

// load environment variables from the .env file
dotenv.config();

// create a new Configuration object with the OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create a new OpenAIApi object with the Configuration object
const openai = new OpenAIApi(configuration);

// create a new express app
const app = express();

// enable CORS for the app
app.use(cors());

// enable JSON parsing for the app
app.use(express.json());

// create a GET route for the root path that sends a message as the response
app.get("/", async (req, res) => {
  res.status(200).send({message: "Hello from the server!"});
});

// create a POST route for the root path that creates a completion with OpenAI and sends the response as the response
app.post("/", async (req, res) => {
  try {
    // get the prompt from the request body
    const model = req.body.model;
    const prompt = req.body.prompt;
    const temperature = parseFloat(req.body.temperature);
    console.log(temperature);
    console.log(req.body);
    // create a completion with OpenAI using the prompt and other parameters
    const response = await openai.createCompletion({ 
      model : model,
      prompt : `${prompt}`,
      temperature : temperature,
      max_tokens : 3000,
      top_p : 1,
      frequency_penalty : 0.5,
      presence_penalty : 0
  }
  );
    // send the completion as the response
    res.status(200).send({ bot: response.data.choices[0].text });
  } catch (error) {
    // log any errors
    console.log(error);

    // send a 500 status code and an error message as the response
    res.status(500).send(error || "Something went wrong" );
  }
});

// start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
