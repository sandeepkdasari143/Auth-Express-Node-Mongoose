require("dotenv").config();

//TODO: Connect the Database
require('./config/database').connect(); 

const express = require('express');
const User = require('./model/user');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(400).send("<h1>Hello from auth system - LCO</h1>");
});

app.post('/register', (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    
    if(!(email && password && firstname && lastname)){
        res.status(400).send('<h1>All fields are reequired</h1>');
        return;
    }

    const existingUser = User.findOne({email: email});

    if(existingUser){
        res.status(401).send("<h1>User Already Exists!</h1>");
    }
});

module.exports = app;