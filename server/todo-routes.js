import express from 'express';
import TodoData from './todo-data';
import TodosController from "../controllers/todos-controller"

const todoExpress = express();
//todoExpress.get('/todo', (req, res) => TodoData.findAll().then(todos => res.json(todos)).catch((err) => res.status(500).json(err)));
todoExpress.get('/todo', TodosController.findAll)
//todoExpress.post('/todo', (req, res) => TodoData.create(req.body).then(todo => res.json(todo)).catch((err) => res.status(500).json(err)));
todoExpress.post('/todo', TodosController.create)
// todoExpress.delete('/todo/:id', (req, res) => TodoData.delete(req.params.id).then(() => res.sendStatus(200)).catch((err) => res.status(500).json(err)));
todoExpress.put("/todo/:id", (req, res) => {
  TodoData.update(req.params.id, req.body)
    .then(todo => {
      res.json(todo);
    })
    .catch(err => res.status(500).json(err));
});

export default todoExpress;
