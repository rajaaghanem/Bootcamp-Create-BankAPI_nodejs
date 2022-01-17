const express = require("express");
const v4 = require("uuid");
const app = express();
const PORT = 3000;
const utilis = require("./users.js");

app.use(express.json());

// return spicific user api by id
app.get("/api/users/:id", (req, res) => {
  try {
    res.status(200).send(utilis.readUser(req.params.id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//return all users api
app.get("/api/users/", (req, res) => {
  try {
    res.status(200).send(utilis.readAllUsers());
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// add new user to the api
app.post("/api/users", (req, res) => {
  try {
    res
      .status(200)
      .send(utilis.addUser(req.body.cash, req.body.credit, req.body.passID));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// deposit cash to a user
app.put("/api/users/:id", (req, res) => {
  try {
    res.status(200).send(utilis.updateDeposit(req.params.id, req.body.amount));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// update a users credit
app.put("/api/users/credit/:id", (req, res) => {
  try {
    res.status(200).send(utilis.updateCredit(req.params.id, req.body.amount));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// withdraw money from the user
app.put("/api/users/withdraw/:id", (req, res) => {
  try {
    res.status(200).send(utilis.withdrawMoney(req.params.id, req.body.amount));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// transfer money from one user to another with credit
app.put("/api/users/transfer/:id", (req, res) => {
  try{
    res.status(200).send(utilis.transferMoney(req.params.id, req.body.id, req.body.amount));
  }catch(e){
    res.status(400).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`listening to port : ${PORT} `);
});


