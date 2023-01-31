import exports from "../server.js";

const login = async function (req, res) {
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

const signup = async function(req, res) {
  const collection = exports.client.db('users').collection('users_info');
  const username = req.body.username;
  const password = req.body.password;
  try {
    const existingUser = await collection.findOne({ username: username });
    if (existingUser) {
      console.log(`User '${username}' already exists`);
      res.send({ status: 'Error' });
    } else {
      await collection.insertOne({
        username: username,
        password: password,
        savedPrompts: [],
      });
      console.log('User created');
      res.send({ status: 'OK' });
    }
  } catch (err) {
    console.log(err);
  }
};

const account = { login, signup };
export default account;