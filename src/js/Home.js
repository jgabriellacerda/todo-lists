const ListComponent = require("./ListComponent");

require("./ListComponent");

const HomeComponent = () => {
	let listCounter = 0;
	let lists = [];

	function addList() {
		console.log("add list");
		listCounter++;
		let listID = listCounter;
		let newList = new ListComponent("Nova lista", listID);

		this.lists.push(newList);
		console.log(newList);
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
	};
};

window.ListComponent = ListComponent;
window.HomeComponent = HomeComponent;
