import exports from "../server.js";


export default async function signup (req, res) {
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

