// import https from "https"
// import fs from "fs"
// import axios from "axios"
import { createRequire } from 'module';
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage('./scratch');

const require = createRequire(import.meta.url);
const express = require('express');
const axios = require('axios');
const app = express()
const ip = require('ip');
app.use(require("express-status-monitor")());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true, limit: '3mb'}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.get("/", (req, res) => {
    return res.send('HELLO WORLD!')
})

let apiCount = 0
app.get("/api/counter", async (req, res) => {
    apiCount = Number(localStorage.getItem('apiCount'))
    if (apiCount) {
        localStorage.setItem('apiCount', apiCount + 1);
    } else {
        localStorage.setItem('apiCount', 1);
    }
    try {
        let users = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        
        let result = {
            users: users.data,
            apiCount: localStorage.getItem('apiCount'),
            ip: ip.address()
        }
        console.log("apiCountcount", localStorage.getItem('apiCount'));
        return res.send(result)
        
    } catch (error) {
        console.log(error);
    }
})


app.get("/api/counter-one", async (req, res) => {
    apiCount = Number(localStorage.getItem('apiCount'))
    if (apiCount) {
        await localStorage.setItem('apiCount', apiCount+1);
    } else {
        await localStorage.setItem('apiCount', 1);
    }
    try {
        let users = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        let result = {
            users: users.data,
            apiCount: localStorage.getItem('apiCount'),
            ip: ip.address()
        }
        console.log("apiCountcount", localStorage.getItem('apiCount'));
        return res.send(result)
        
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/counter-two", async (req, res) => {
    apiCount = Number(localStorage.getItem('apiCount'))
    if (apiCount) {
        await localStorage.setItem('apiCount', apiCount+1);
    } else {
        await localStorage.setItem('apiCount', 1);
    }
    try {
        let users = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        let result = {
            users: users.data,
            apiCount: localStorage.getItem('apiCount'),
            ip: ip.address()
        }
        console.log("apiCountcount", localStorage.getItem('apiCount'));
        return res.send(result)
        
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/clear", async (req, res) => {
    await localStorage.setItem('apiCount', 0);
    console.log("get", localStorage.getItem("apiCount"));
    let result = {
        users: [],
        apiCount: 0,
        ip: ip.address()
    }
    return res.send(result)
})

// const options = {
//     key: fs.readFileSync('public/key.pem'),
//     cert: fs.readFileSync('public/cert.pem')
// }

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
// https.createServer(options, app).listen(PORT, console.log(`server runs on port https://localhost:${PORT}`))