import assert from "assert"
import Todo from "../server/todo"

describe("creating todos", () => {
  it("saves a todo", done => {
    // create a todo instance for test
    const newTodo = new Todo({text: "Adding a todo"})
    // persist/save the mongoose obj
    newTodo
      .save()
      .then(() => {
        // assert that newTodo has been persisted/saved
        assert(!newTodo.isNew)
        done()
      })
  })

})
