(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ListComponent = require("./ListComponent");

require("./ListComponent");

const HomeComponent = () => {
	let listCounter = 0;
	let lists = [];

	function addList() {
		listCounter++;
		let listID = listCounter;
		let newList = new ListComponent("Nova lista", listID);

		this.lists.push(newList);
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

	function deleteList(ID) {
		let filteredLists = this.lists.filter((list) => {
			return list.ID !== ID;
		});
		this.lists = filteredLists;
	}

	return {
		lists,
		addList,
		deleteList,
		confirmDelete,
	};
};

module.exports = HomeComponent;

window.ListComponent = ListComponent;
window.HomeComponent = HomeComponent;

},{"./ListComponent":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);