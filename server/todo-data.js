let todosCreated = 1;
let todos = [{
	id: 1,
	text: 'Finish coding exercise',
	completed: false
}];

// the app could be improved with some persistent data store

export default class TodoData {
	static create(todo) {
		return new Promise((resolve) => {
			todo.id = ++todosCreated;
			todos.push(todo);
			resolve(todo);
		});
	}

	static findAll() {
		return new Promise((resolve) => resolve(todos));
	}

	// static delete(id) {
	// 	return new Promise((resolve, reject) => {
	// 		const todoIndex = todos.findIndex(todo => todo.id.toString() === id.toString());
	// 		console.log(`todoIndex: ${todoIndex}`)
	// 		if (todoIndex < 0 || todoIndex >= todos.length) return reject();
	//
	// 		const todoText = newTodos[todoIndex].text.strike()
	// 		todos.splice(todoIndex, 1, todoText);
	// 		resolve();
	// 	})
	// }

	static update(id, item) {
		return new Promise((resolve, reject) => {
			const todoIndex = todos.findIndex(todo => todo.id.toString() === id.toString());
			if (todoIndex < 0 || todoIndex >= todos.length) return reject();
			const newTodo = {...todos[todoIndex], completed: item.completed}
			const newTodos = todos.splice(todoIndex, 1, newTodo);
			resolve(newTodo)
		})
	}
}
