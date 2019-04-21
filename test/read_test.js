import assert from "assert"
import Todo from "../models/todo"

describe("reading todos", () => {
  // set var scope here to make avail for it() fns
  let newTodo

  beforeEach(done => {
    newTodo = new Todo({text: "Adding a todo to find in mocha tests"})
    newTodo
      .save()
      .then( () => done() )
  })

  it("finds a todo with text containing [mocha]", done => {
    // returns an array
    // NOTE: /.*m.*/ is regex similar to sql %mocha%
    Todo
      .find({text: /.*mocha.*/i})
      // NOTE: the mongodb id is an objectId
      .then(todos => {
        assert(todos[0]._id.toString() === newTodo._id.toString())
        done()
      })
  })

})
