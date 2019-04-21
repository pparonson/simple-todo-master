import React from 'react';
import FetchApi from '../fetch-api';

const ENTER_KEY_CODE = 13;

export default class TodoApp extends React.Component {
	state = { todos: [], newText: '', completed: 0, pending: 0 };

	constructor(props) {
		super(props);
		this.getTodos();
	}

	getTodos = () => {
		return FetchApi
			.get('/todo')
			.then(todos => this.setState({ todos }))
			.catch(() => alert('There was an error getting todos'));
	};

	createTodo = () => {
		FetchApi
			.post('/todo', { text: this.state.newText , isCompleted: false })
			.then((newTodo) => {
				const newTodos = Array.from(this.state.todos);
				newTodos.push(newTodo);
				this.setState({ todos: newTodos, newText: '' });
			})
			.catch(() => alert('There was an error creating the todo'));
	};

	// handleDeleteRequest = (id) => {
	// 	FetchApi
	// 		.delete(`/todo/${id}`)
	// 		.then(() => {
	// 			const newTodos = Array.from(this.state.todos);
	// 			const todoIndex = newTodos.findIndex(todo => todo.id.toString() === id.toString());
	// 			newTodos.splice(todoIndex, 1);
	// 			this.setState({ todos: newTodos });
	// 		})
	// 		.catch(() => alert('Error removing todo'));
	// };

	handleToggleCompletedRequest = (id) => {
		const newTodos = Array.from(this.state.todos);
		const todoIndex = newTodos.findIndex(todo => todo.id.toString() === id.toString());
		const toggleState = newTodos[todoIndex].completed = !(newTodos[todoIndex].completed);

		FetchApi
			.put(`/todo/${id}`, { completed: toggleState })
			.then((todo) => {
				newTodos.splice(todoIndex, 1, todo);
				this.setState({ todos: newTodos });
			})
			.catch(() => alert('Error removing todo'));
	};

	// the app could be improved with a hander to allow the user to edit a todo text inline

	// the app could be improved with the hander restored to allow the user to delete a todo inline

	handleChange = e => {
		this.setState({ newText: e.target.value });
	};

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return;
		this.createTodo();
	};

	showToggle = (todo) => {
		if (todo.isCompleted) {
				return "(x) " + todo.text + " ";
		} else {
				return "( ) " + todo.text + " ";
		}
	}

	sumCompleted = (todos, bool) => {
		const count = todos.length !== 0 ?
			todos.filter(item => item.isCompleted === bool).length : 0
		console.log(`todos: ${JSON.stringify(todos, null, 2)}, bool: ${bool}`);
		console.log(`count: ${count}`);
		return count;
	}

	render() {
		return (
			<div>
				<h1>todos</h1>
				<div>Completed: {this.sumCompleted(this.state.todos, true)}</div>
				<div>Pending: {this.sumCompleted(this.state.todos, false)}</div>
				<input
					autoFocus
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					placeholder="What needs to be done?"
					value={this.state.newText}
				/>
				<ul>
					{this.state.todos.map(todo => {
							// the toggle completed status could be improved with some icons
							// and possible strike-through text
							return (
								<li key={todo.id}>
									<div className="view">
										<label onClick={() => this.handleToggleCompletedRequest(todo.id)}>{this.showToggle(todo)}</label>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
