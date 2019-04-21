import mongoose from "mongoose"

before(done => {
  mongoose.connect("mongodb://localhost/simple-todo_test", { useNewUrlParser: true })
  mongoose.connection
    .once("open", () => {
      console.log("mongoose connection established")
      done()
    })
    .on( "error", e => console.warn("Error: ", e) )

})  

// hook to execute before test suites and empty db
beforeEach(done => {
  mongoose.connection.collections["todos"].drop(() => {
    // this callback is only executed after beforeEach is completed
    done()
  })
})
