const express = require("express");
const v4 = require("uuid");
const app = express();
const PORT = 3000;
const utilis = require("./users.js");

app.use(express.json());

//return the array of numbers to the client
app.get("/clints/:id", (req, res) => {
  res.send(utilis.readUser(req.params.id));
});

//create a new number that you are
//getting from the body and append it to your array of numbers,
//send the array back to the client
app.post("/users", (req, res) => {
  res.send(utilis.addUser(req.body.cash, req.body.credit, req.body.passID));
});

//Can deposit cash to a user
app.put("/users/:id", (req, res) => {
  res.send(utilis.updateDeposit(req.params.id, req.body.amount));
});

app.put("/users/credit/:id", (req, res) => {
  res.send(utilis.updateCredit(req.params.id, req.body.amount));
});

app.put("/users/withdraw/:id", (req, res) => {
  res.send(utilis.withdrawMoney(req.params.id, req.body.amount));
});

app.put("/users/transfer/:id", (req, res) => {
  res.send(utilis.transferMoney(req.params.id, req.body.id, req.body.amount));
});

//get the number you want to remove
//from your params, remove the number from your array of
//numbers, send the array back to the client
app.delete("/users/:id", (req, res) => {
  if (!array.includes(Number(req.params.num))) {
    return res.status(400).send("number doesnt exist");
  } else {
    const newArr = array.filter((number) => {
      return number !== Number(req.params.num);
    });
    array = newArr;
    res.send(array);
  }
});

//get the number you want to remove from
// your params, get the new number you want to be replaced
// from your body, modify the number from your array of
// numbers, send the array back to the client.
app.put("/users/:id", (req, res) => {
  if (!array.includes(Number(req.params.num))) {
    return res.status(400).send("number doesnt exist");
  } else {
    const newArr = array.map((number) => {
      return number === Number(req.params.num) ? req.body.number : number;
    });
    array = newArr;
    res.send(array);
  }
});

app.listen(PORT, () => {
  console.log(`listening to port : ${PORT} `);
});
