const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 3030;
const MONGO_URL = "mongodb://root:root123@localhost:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new MongoClient(MONGO_URL);

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("my-sample-db");
    const data = await db.collection("users").find({}).toArray();

    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("my-sample-db");
    await db.collection("users").insertOne(userObj);


    res.send("User added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
