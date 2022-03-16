let ListComponent = function (name, ID) {
	let todoCounter = 0;
	let todos = [];

	function pushTodo(todo) {
		this.todos.push(todo);
	}

	function popTodo(ID) {
		let filteredTodos = this.todos.filter((todo) => {
			return todo.ID !== ID;
		});
		this.todos = filteredTodos;
	}

	function addTodo(todoText) {
		if (todoText != "") {
			todoCounter++;
			let todoID = todoCounter;
			let newTodo = {
				ID: todoID,
				text: todoText,
			};
			this.pushTodo(newTodo);
		}
	}

	function deleteTodo(ID) {
		this.popTodo(ID);
	}

	return {
		ID,
		name,
		todos,
		pushTodo,
		popTodo,
		addTodo,
		deleteTodo,
	};
};

module.exports = ListComponent;
