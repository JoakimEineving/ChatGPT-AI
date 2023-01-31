import exports from "../server.js";

export default async function savePrompt(req, res) {
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