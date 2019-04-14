import React from 'react';
import FetchApi from '../fetch-api';

const ENTER_KEY_CODE = 13; // return / enter keyCode

export default class TodoApp extends React.Component {
	state = { todos: [], newText: '' };

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
			.post('/todo', { text: this.state.newText })
			.then((newTodo) => {
				const newTodos = Array.from(this.state.todos);
				newTodos.push(newTodo);
				this.setState({ todos: newTodos, newText: '' });
			})
			.catch(() => alert('There was an error creating the todo'));
	};

	handleDeleteRequest = (id) => {
		FetchApi
			.post(`/todo/${id}`, { text: this.state.newText })
			.then(() => {
				const newTodos = Array.from(this.state.todos);
				const todoIndex = newTodos.findIndex(todo => todo.id.toString() === id.toString());

				// Note: This method changes the original array.
				newTodos.splice(todoIndex, 1, completedTodo);
				this.setState({ todos: newTodos });
			})
			.catch(() => alert('Error removing todo'));
	};



	handleChange = e => {
		this.setState({ newText: e.target.value });
	};

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return;
		// if keyCode = "Enter" call createTodo()
		this.createTodo();
		// consider re-calculating completed and pending todos here
	};

	render() {
		return (
			<div>
				<h1>todos</h1>
				<input
					autoFocus
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					placeholder="What needs to be done?"
					value={this.state.newText}
				/>
				<ul>
					{this.state.todos.map(todo => (
						<li key={todo.id}>
							<div className="view">
								<label>{todo.text}</label>
								<button onClick={() => this.handleDeleteRequest(todo.id)}>Remove Todo</button>

							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
