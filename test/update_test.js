import assert from "assert"
import Todo from "../server/todo"

describe("updating todos", () => {
  let newTodo

  beforeEach(done => {
    newTodo = new Todo({text: "Updating a todo in mocha tests"})
    newTodo
      .save()
      .then( () => done() )
  })

  it("set and save a todo model instance", done => {
    newTodo.set("text", "setting the update")
    newTodo
      .save()
      .then(() => {
        // use an empty obj to retrieve all records
        Todo
          .find({})
          // find returns all users and allows chaining of then() promise
          .then(todos => {
            assert(todos.length === 1)
            assert(todos[0].text === "setting the update")
            done()
          })
      })

  })
})
