import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/api/node/users/currentuser", (req, res) => {
  res.send("My name is Yoshiji!");
});

app.listen(3000, () => {
  console.log("node service listening on port 3000!");
});
