let ListComponent = function (name, id, token) {
	let todos = [];

	let url = `http://${window.location.host}`;

	async function init() {
		await this.getTodos();
	}

	async function getTodos() {
		let response = await fetch(`${url}/todos.json`, {
			method: "GET",
		});

		todos = await response.json();

		let listTodos = todos.filter((todo) => {
			return todo.list_id === this.id;
		});
		listTodos.forEach((todo) => {
			this.pushTodo(todo);
		});
	}

	function pushTodo(todo) {
		this.todos.push(todo);
	}

	function popTodo(id) {
		let filteredTodos = this.todos.filter((todo) => {
			return todo.id !== id;
		});
		this.todos = filteredTodos;
	}

	async function addTodo(todoTask) {
		if (checkTodoTask(todoTask)) {
			let formData = new FormData();
			formData.append("todo[list_id]", this.id);
			formData.append("todo[task]", todoTask);
			formData.append("authenticity_token", this.token);

			let response = await fetch(`${url}/todos.json`, {
				method: "POST",
				body: formData,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});

			if (response.status == 201) {
				let todo = await response.json();
				this.pushTodo(todo);
			} else {
				showErrorAlert();
			}
		}
	}

	async function deleteTodo(id) {
		let formData = new FormData();
		formData.append("authenticity_token", this.token);
		let response = await fetch(`${url}/todos/${id}.json`, {
			method: "DELETE",
			body: formData,
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		if (response.status == 204) {
			this.popTodo(id);
		} else {
			showErrorAlert();
		}
	}

	async function updateName(newName) {
		let oldName = this.name;
		if (checkName(newName)) {
			let formData = new FormData();
			formData.append("list[name]", newName);
			formData.append("authenticity_token", this.token);

			let response = await fetch(`${url}/lists/${this.id}.json`, {
				method: "PATCH",
				body: formData,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});

			if (response.status == 200) {
				let list = await response.json();
				this.setName(list.name);
			} else {
				showErrorAlert();
				// Reset name
				this.name = "";
				this.name = oldName;
			}
		} else {
			// Reset name
			this.name = "";
			this.name = oldName;
		}
	}

	function setName(name) {
		if (checkName(name)) {
			this.name = name;
		}
	}

	function checkName(name) {
		if (name == "") {
			return false;
		}
		return true;
	}

	function checkTodoTask(task) {
		if (task == "") {
			return false;
		}
		return true;
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
		init,
		id,
		name,
		todos,
		pushTodo,
		popTodo,
		addTodo,
		checkTodoTask,
		deleteTodo,
		updateName,
		checkName,
		setName,
		randomTodo,
		getTodos,
		token,
	};
};

module.exports = ListComponent;
