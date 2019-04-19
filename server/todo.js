import mongoose from "mongoose"

const {Schema} = mongoose

const TodoSchema = new Schema({
	text: String
})

// Todo represents the entire collection
const Todo = mongoose.model("todo", TodoSchema)

export default Todo
