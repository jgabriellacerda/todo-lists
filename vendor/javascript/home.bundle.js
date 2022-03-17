(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ListComponent = require("./ListComponent");

require("./ListComponent");

const HomeComponent = (token) => {
	let lists = [];

	let url = `http://${window.location.host}`;

	async function init() {
		await this.getLists();
	}

	async function getLists() {
		let response = await fetch(`${url}/lists.json`, {
			method: "GET",
		});
		console.log(response);
		data = await response.json();
		console.log(data);
		for (let list of data) {
			console.log(list);
			let newList = new ListComponent(list.name, list.id, token);
			this.pushList(newList);
		}
	}

	function pushList(newList) {
		this.lists.push(newList);
	}

	async function addList() {
		let formData = new FormData();
		formData.append("list[name]", "Nova lista");
		formData.append("authenticity_token", this.token);

		let response = await fetch(`${url}/lists.json`, {
			method: "POST",
			body: formData,
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		if (response.status == 201) {
			let list = await response.json();
			let newList = new ListComponent(list.name, list.id, token);
			this.pushList(newList);
		}
	}

	async function confirmDelete(id) {
		let result = await Swal.fire({
			title: "Cuidado!",
			icon: "error",
			text: "Tem certeza que deseja deletar esta lista?",
			confirmButtonText: "Sim",
			cancelButtonText: "Cancelar",
			showCancelButton: true,
			customClass: {
				confirmButton: "btn btn-danger m-1",
				cancelButton: "btn btn-secondary m-1",
			},
			buttonsStyling: false,
		});

		if (result.isConfirmed) {
			this.deleteList(id);
		}
	}

	async function deleteList(id) {
		let formData = new FormData();
		formData.append("authenticity_token", this.token);
		let response = await fetch(`${url}/lists/${id}.json`, {
			method: "DELETE",
			body: formData,
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		if (response.status == 204) {
			this.popList(id);
		}
	}

	function popList(id) {
		let filteredLists = this.lists.filter((list) => {
			return list.id !== id;
		});
		this.lists = filteredLists;
	}

	return {
		init,
		lists,
		addList,
		deleteList,
		confirmDelete,
		pushList,
		popList,
		getLists,
		token,
	};
};

module.exports = HomeComponent;

window.ListComponent = ListComponent;
window.HomeComponent = HomeComponent;

},{"./ListComponent":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
