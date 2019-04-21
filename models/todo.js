import mongoose from "mongoose"

const {Schema} = mongoose

const TodoSchema = new Schema({
	text: {
		type: String
	},
	isCompleted: {
		type: Boolean,
		default: false
	}
})

// Todo represents the entire collection
const Todo = mongoose.model("todo", TodoSchema)

export default Todo
