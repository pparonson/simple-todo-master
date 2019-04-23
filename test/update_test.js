import assert from "assert"
import Todo from "../models/todo"

describe("updating todos", () => {
  let newTodo

  beforeEach(done => {
    newTodo = new Todo({text: "Updating a todo in mocha tests"})
    newTodo
      .save()
      .then( () => done() )
  })

  it("sets and saves a todo model instance", done => {
    newTodo.set("text", "setting the instance update")
    newTodo
      .save()
      .then(() => {
        // use an empty obj to retrieve all records
        Todo
          .find({})
          // find returns all users and allows chaining of then() promise
          .then(todos => {
            assert(todos.length === 1)
            assert(todos[0].text === "setting the instance update")
            done()
          })
      })
  })

  it("updates a class", done => {
    Todo
      // old --> new
      .update({text: /.*mocha.*/i}, {text: "updating via Todo class"})
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
  })

})
