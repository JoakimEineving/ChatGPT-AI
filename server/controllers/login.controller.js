

import exports from "../server.js";

export default async function login(req, res) {
  const collection = exports.client.db("users").collection("users_info");
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await collection.findOne({
      username: username,
      password: password,
    });
    if (result) {
      console.log("User logged in");
      res.send({ status: "OK" });
      exports.updateUser(username);
    } else {
      console.log("User not found");
      res.send({ status: "Error" });
    }
  } catch (err) {
    console.log(err);
  }
}