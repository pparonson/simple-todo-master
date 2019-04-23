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

  static update(req, res, next) {
    Todo
      // old --> new
      // req.params.id, req.body
      .update({text: /.*mocha.*/i}, req.body)
      .then(() => {
        Todo
          .find({})
          .then(todos => {
            assert(todos.length === 1)
            console.log(todos[0].text)
            assert(todos[0].text === "updating via Todo class")
            done()
          })
      })
  }
}
