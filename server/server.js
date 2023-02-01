import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import chatbot from "./routes/chatbotRoute.js";
import account from "./routes/accountRoute.js";
import prompt from "./routes/promptController.js";

const app = express();
const port = 3000;

dotenv.config();
let activeUser = "";

function getUser() {
  return activeUser;
}
function updateUser(user) {
  activeUser = user;
}

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from the server!" });
});

client.connect((err) => {
  app.use(bodyParser.json()); 
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  
  app.get("/", (req, res) => {
    res.send("Welcome to your server");
  });
  app.use('/account', account);
  app.use('/prompt', prompt);
  });

app.use('/chatbot', chatbot);

app.listen({ port }, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
const exports = { client, updateUser, getUser}
export default exports;