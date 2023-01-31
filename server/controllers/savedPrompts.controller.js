import exports from "../server.js";

export default async function savedPrompts(req, res) {
    const collection = exports.client.db("users").collection("users_info");
    try {
      const savedPrompts = await collection
        .find({ username: exports.getUser() }, { projection: { savedPrompts: 1 } })
        .toArray();
        console.log('savedPrompts');
      console.log(savedPrompts[0].savedPrompts);
      res.status(200).send(savedPrompts[0].savedPrompts);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }