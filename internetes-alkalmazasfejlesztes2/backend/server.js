import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/users", (req, res) => {
  const users = db.data.users;
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  db.data.users.push(newUser);
  db.write();
  res.json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body;
  const index = db.data.users.findIndex((user) => +user.id === +id);

  if (index !== -1) {
    db.data.users[index] = user;
    db.write();
    res.json(user);
  } else {
    res.status(404).json({ message: "A felhasználó nem található" });
  }
});

app.listen(port, () => {
  console.log(`A szerver fut a ${port} porton`);
});
