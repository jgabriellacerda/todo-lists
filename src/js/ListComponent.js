let ListComponent = function (name) {
	let todoCounter = 0;
	let todos = [];

	function pushTodo(todo) {
		this.todos.push(todo);
	}

	function popTodo(id) {
		let filteredTodos = this.todos.filter((todo) => {
			return todo.ID !== id;
		});
		this.todos = filteredTodos;
	}

	function addTodo(todoText) {
		if (todoText != "") {
			todoCounter++;
			let newTodo = {
				ID: todoCounter,
				text: todoText,
			};
			this.pushTodo(newTodo);
		}
	}

	function deleteTodo(id) {
		this.popTodo(id);
	}

	function updateName(newName) {
		let oldName = this.name;
		if (newName != "") {
			this.name = newName;
		} else {
			// Reset name
			this.name = "";
			this.name = oldName;
		}
	}

	return {
		name,
		todos,
		pushTodo,
		popTodo,
		addTodo,
		deleteTodo,
		updateName,
	};
};

module.exports = ListComponent;
