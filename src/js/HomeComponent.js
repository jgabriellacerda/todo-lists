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
