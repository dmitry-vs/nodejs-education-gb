const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');

const TodoList = require('./helpers/todolist')
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true, useCreateIndex: true });

const app = express();
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/todo', async (req, res) => {
  const tasks = await TodoList.getTasks();
  res.render('todolist', {
    tasks: JSON.stringify(tasks),
  });
});

app.post('/todo', async (req, res) => {
  if(req.body.action === 'newTask') {
    await TodoList.addTask(req.body.name);
  } else if(req.body.action === 'deleteTask') {
    await TodoList.deleteTask(req.body.id);
  } else if(req.body.action === 'taskDone') {
    await TodoList.markTaskDone(req.body.id);
  } else if(req.body.action === 'taskUndone') {
    await TodoList.markTaskUndone(req.body.id);
  } else {
    return res.send('Error: incorrect request');
  } 
  
  const tasks = await TodoList.getTasks();
  res.setHeader('Content-Type', 'application/json');
  res.send(tasks);
});

app.use((req, res, next) => {
  res.status(404).send("404: Not found")
});

app.listen(3000);