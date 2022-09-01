// import
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const server = require("./server.json")


// initialize express
const app = express();

// midleware
app.use(cors())
app.use(express.json())

// CREATE-REQUEST
// get
app.get("/", (req, res) => {
    fs.readFile("./src/server.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        res.send(data)
    })
})
// post
app.post("/user", (req, res) => {
    const {name, email} = req.body;
    
    const data = server;

    const exist = data.filter(val => {
        if (val.email === email) {
            return val
        }
    });

    if (exist.length > 0) {
        return res.json({
            success: false,
            msg: "email exist"
        })
    }

    data.push(req.body);

    fs.writeFile("./src/server.json", JSON.stringify(data, null, 2), () => {})

    res.json({
        success: true,
        msg: req.body
    });
})



// creating port variable
const port = 8000;

// linten to request on this port
app.listen(port, () => {
    console.log("running at port: ", port);
})