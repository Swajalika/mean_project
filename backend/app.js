/* Entry point */

const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');
const { request } = require('express');

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

app.get('/lists/:listId',(req,res) => {
    List.find({ _id : req.params.listId})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.patch('/lists/:listId',(req,res) => {
    List.findOneAndUpdate({ '_id' : req.params.listId}, { $set : req.body})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.delete('/lists/:listId',(req,res) => {
    //Delete all tasks inside the list first
    const deleteTasks = (list) => {
        Task.deleteMany({ _listId : list._id})
            .then(() => list)
            .catch((error) => console.log(error));
    };

   List.findByIdAndDelete(req.params.listId)
        .then(list => res.send(deleteTasks(list)))
        .catch((error) => console.log(error));

});

/* For tasks url: http://localhost:3000/lists/:listId/tasks/:taskId */

app.get('/lists/:listId/tasks',(req, res) => {
    Task.find({ _listId: req.params.listId })
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error));
});

app.post('/lists/:listId/tasks',(req, res) => {
    (new Task({ '_listId': req.params.listId , 'title': req.body.title , '_taskId': req.params._taskId}))
        .save()
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOne({ _listId : req.params.listId , _id : req.params.taskId})
        .then(task => res.send(task))
        .catch((error) => console.log(error));
});

app.patch('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOneAndUpdate({ _listId : req.params.listId, '_id' : req.params.taskId}, { $set : req.body})
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error));
});

app.delete('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findByIdAndDelete({ _listId : req.params.listId, _id : req.params.taskId})
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error));
});

app.listen(3000, () => console.log("Server is Connected on port 3000"));