const express = require("express");
const v4 = require('uuid')
const app = express();
const PORT = 3000;
const utilis= require("./users.js");

app.use(express.json());

app.get("/users", (req, res)=>{
    res.send("success using get method");
});

app.post("/users", (req, res)=>{
    console.log(req.body);
    res.send("success using post method");
});

app.post("/users", (req, res)=>{
    console.log(req.body);
    res.send("success using post method");
});

app.delete("/users/:num", (req, res)=>{
    console.log(req.params);
    res.send("success using delete method");
});

app.put("/users/:num", (req, res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send("success using put method");
});

app.listen(PORT, () => {
  console.log(`listening to port : ${PORT} `);
});

