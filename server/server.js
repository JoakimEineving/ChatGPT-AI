import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
const app = express();
const port = 3000;

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from the server!" });
});

client.connect((err) => {
  const collection = client.db("users").collection("users_info");

  // We are using our packages here
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true,
    })
  );
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Welcome to your server");
  });

  //Route that handles login logic
  app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body.username + " " + req.body.password)

    try {
      const result = await collection.findOne({
        username: username,
        password: password,
      });
      console.log(result)
      if (result) {
        console.log(result);
        console.log("User logged in");
        res.send({ status: "OK" });

        // client.close();
      } else {
        console.log("User not found");
        res.send({ status: "Error" });

      }
    } catch (err) {
      console.log(err);
    }
  });

  //Route that handles signup logic
  app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
      const existingUser = await collection.findOne({ username: username });
      if (existingUser) {
        console.log(`User '${username}' already exists`);
        res.send({ status: "Error" });
      } else {
        await collection.insertOne({ username: username, password: password });
        console.log("User created");
        res.send({ status: "OK" });
        // client.close();
      }
    } catch (err) {
      console.log(err);
    }
  });
});

// create a POST route for the root path that creates a completion with OpenAI and sends the response as the response
app.post("/chatbot", async (req, res) => {
  try {
    // get the prompt from the request body
    const model = req.body.model;
    const prompt = req.body.prompt;
    const temperature = parseFloat(req.body.temperature);
    console.log(temperature);
    console.log(req.body);
    // create a completion with OpenAI using the prompt and other parameters
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
    // send the completion as the response
    res.status(200).send({ bot: response.data.choices[0].text });
  } catch (error) {
    // log any errors
    console.log(error);

    // send a 500 status code and an error message as the response
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen({ port }, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
