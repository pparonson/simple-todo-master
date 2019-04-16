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
			.post('/todo', { text: this.state.newText , completed: false })
			.then((newTodo) => {
				const newTodos = Array.from(this.state.todos);
				newTodos.push(newTodo);
				this.setState({ todos: newTodos, newText: '' });
			})
			.catch(() => alert('There was an error creating the todo'));
	};

	handleToggleCompletedRequest = (id) => {
		const newTodos = this.state.todos
		const todoIndex = newTodos.findIndex(todo => todo.id.toString() === id.toString());
		const newState = newTodos[todoIndex].completed = !(newTodos[todoIndex].completed);

		FetchApi
			.put(`/todo/${id}`, { completed: newState })
			.then((todo) => {
				newTodos.splice(todoIndex, 1, todo);
				this.setState({ todos: newTodos });
			})
			.catch(() => alert('Error removing todo'));
	};

	handleChange = e => {
		this.setState({ newText: e.target.value });
	};

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return;
		this.createTodo();
	};

	toggleCompleted = (todo) => {
		if (todo.completed) {
				return "(x) " + todo.text + " ";
		} else {
				return "( ) " + todo.text + " ";
		}
	}

	calculateCompleted = (todos) => {
		const count =  todos.filter(item => item.completed === true).length
		console.log(`count: ${count}`);
		return count
	}

	calculatePending = (todos) => {
		const count =  todos.filter(item => item.completed === false).length
		console.log(`count: ${count}`);
		return count
	}

	render() {
		return (
			<div>
				<h1>todos</h1>
				<div>Completed: {this.calculateCompleted(this.state.todos)}</div>
				<div>Pending: {this.calculatePending(this.state.todos)}</div>
				<input
					autoFocus
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					placeholder="What needs to be done?"
					value={this.state.newText}
				/>
				<ul>
					{this.state.todos.map(todo => {

							return (
								<li key={todo.id}>
									<div className="view">
										<span ></span>
										<label onClick={() => this.handleToggleCompletedRequest(todo.id)}>{this.toggleCompleted(todo)}</label>
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
