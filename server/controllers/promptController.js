import server from "../server.js";

const savedPrompts = async function (req, res) {
  const collection = server.client.db("users").collection("users_info");
  try {
    const savedPrompts = await collection
      .find(
        { username: server.getUser() },
        { projection: { savedPrompts: 1 } }
      )
      .toArray();
    res.status(200).send(savedPrompts[0].savedPrompts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const savePrompt = async function (req, res) {
  const collection = server.client.db("users").collection("users_info");
  try {
    const response = req.body.response;
    const prompt = req.body.prompt;
    collection.updateOne(
      { username: server.getUser() },
      
      { $push: { savedPrompts: { prompt: prompt, response: response } } }
    );
    res.status(200).send({ message: "Prompt saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteAll = async function (req, res) {
  const collection = server.client.db("users").collection("users_info");
  try {
    collection.updateOne(
      { username: server.getUser() },
      { $set: { savedPrompts: [] } }
    );
    res.status(200).send({ message: "Prompt deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const handlePrompt = { savedPrompts, savePrompt, deleteAll };
export default handlePrompt;
