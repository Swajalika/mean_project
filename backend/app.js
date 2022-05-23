/* Entry point */

const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');

/* Enable our application to parse JSON data*/
app.use(express.json());

/*  CORS - Cross Orgin Request Security
    local:3000 - backend api
    local:4200 - frontend
*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use(cors());

/*  Creating url endpoints ----
    List : Create, Update, ReadOne, ReadAll, Delete
    Task : Create, Update, ReadOne, ReadAll, Delete
*/
app.get('/lists',(req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.post('/lists',(req, res) => {
    (new List({ 'title': req.body.title }))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});








app.listen(3000, () => console.log("Server is Connected on port 3000"));