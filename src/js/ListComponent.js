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

	async function randomTodo() {
		let response = await fetch("https://www.boredapi.com/api/activity/");
		let data = await response.json();
		if (data.activity) {
			let todoText = data.activity;
			this.addTodo(todoText);
		} else {
			showErrorAlert();
		}
	}

	function showErrorAlert() {
		Swal.fire({
			title: "Erro!",
			icon: "error",
			text: "Algo deu errado, tente novamente mais tarde",
			customClass: {
				confirmButton: "btn btn-secondary",
			},
			buttonsStyling: false,
		});
	}

	return {
		ID,
		name,
		todos,
		pushTodo,
		popTodo,
		addTodo,
		deleteTodo,
		updateName,
		randomTodo,
	};
};

module.exports = ListComponent;
