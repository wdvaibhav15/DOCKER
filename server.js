
import express from "express";
import path from "path";
import { MongoClient } from "mongodb";


const app = express();

const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:Admin123@localhost:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db("docker-db");
        const data = await db.collection("users").find({}).toArray();

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching users");
    } finally {
        await client.close();
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        console.log(req.body);

        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db("docker-db");
        const data = await db.collection("users").insertOne(userObj);

        console.log(data);
        console.log("Data inserted in DB");

        res.status(201).send({
            message: "User inserted successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error inserting user");
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
