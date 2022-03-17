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

		console.log(result);
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
