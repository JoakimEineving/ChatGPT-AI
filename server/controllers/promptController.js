import exports from "../server.js";

const savedPrompts = async function (req, res) {
  const collection = exports.client.db("users").collection("users_info");
  try {
    const savedPrompts = await collection
      .find(
        { username: exports.getUser() },
        { projection: { savedPrompts: 1 } }
      )
      .toArray();
    console.log("savedPrompts");
    console.log(savedPrompts[0].savedPrompts);
    res.status(200).send(savedPrompts[0].savedPrompts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const savePrompt = async function (req, res) {
  const collection = exports.client.db("users").collection("users_info");
  try {
    const response = req.body.response;
    collection.updateOne(
      { username: exports.getUser() },
      { $push: { savedPrompts: { response: response } } }
    );
    res.status(200).send({ message: "Prompt saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
const handlePrompt = { savedPrompts, savePrompt };
export default handlePrompt;
