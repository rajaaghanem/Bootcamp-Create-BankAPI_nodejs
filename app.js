const express = require("express");
const v4 = require("uuid");
const app = express();
const PORT = 3000;
const utilis = require("./users.js");

app.use(express.json());

//return spicific user api by id
app.get("/api/users/:id", (req, res) => {
  res.send(utilis.readUser(req.params.id));
});

//return all users api
app.get("/api/users", (req, res) => {
  res.send(utilis.readAllUsers());
});

// add new user to the api
app.post("/api/users", (req, res) => {
  res.send(utilis.addUser(req.body.cash, req.body.credit, req.body.passID));
});

// deposit cash to a user
app.put("/api/users/:id", (req, res) => {
  res.send(utilis.updateDeposit(req.params.id, req.body.amount));
});

// update a users credit
app.put("/api/users/credit/:id", (req, res) => {
  res.send(utilis.updateCredit(req.params.id, req.body.amount));
});

// withdraw money from the user
app.put("/api/users/withdraw/:id", (req, res) => {
  res.send(utilis.withdrawMoney(req.params.id, req.body.amount));
});

// transfer money from one user to another with credit
app.put("/api/users/transfer/:id", (req, res) => {
  res.send(utilis.transferMoney(req.params.id, req.body.id, req.body.amount));
});


app.listen(PORT, () => {
  console.log(`listening to port : ${PORT} `);
});
