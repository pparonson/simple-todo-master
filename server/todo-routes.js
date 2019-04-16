import express from 'express';
import TodoData from './todo-data';

const todoExpress = express();
todoExpress.get('/todo', (req, res) => TodoData.findAll().then(todos => res.json(todos)).catch((err) => res.status(500).json(err)));
todoExpress.post('/todo', (req, res) => TodoData.create(req.body).then(todo => res.json(todo)).catch((err) => res.status(500).json(err)));
todoExpress.delete('/todo/:id', (req, res) => TodoData.delete(req.params.id).then(() => res.sendStatus(200)).catch((err) => res.status(500).json(err)));

// TODO: Implement
todoExpress.put('/todo/:id', (req, res) => res.sendStatus(501));
todoExpress.post("/todo/:id", (req, res) => {
  console.log(` req.params.id: ${req.params.id}, req.body: ${JSON.stringify(req.body, null, 2)}`)
  TodoData.update(req.params.id, req.body)
    .then(todo => {
      console.log(` SERVER: TodoRoutes: todo: ${JSON.stringify(todo, null, 2)}`)
      res.json(todo)
    })
    .catch(err => res.status(500).json(err))
})

export default todoExpress;
