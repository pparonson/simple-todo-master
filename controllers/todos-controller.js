import Todo from "../models/todo"

export default class TodosController {
  static findAll(req, res, next) {
    return Todo
      .find({})
      .then(todos => {
        // console.log(`todos: ${JSON.stringify(todos, null, 2)}`)
        // res.send(todos)
        res.json(todos)
      })
      .catch(next);
	}

  static create(req, res, next) {
    const newTodo = new Todo(req.body)
    return newTodo
      .save()
      .then(todo => {
        console.log(`todo: ${JSON.stringify(todo, null, 2)}`)
        res.json(todo)
      })
      .catch(next);
  }
}
