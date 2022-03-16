const ListComponent = require("./ListComponent.js");

describe("ListComponent.js", function () {
	test("Create list", () => {
		let list = ListComponent("New list");

		expect(list.name).toBe("New list");
		expect(list.todos).toStrictEqual([]);
	});

	test("Add To Do", () => {
		let list = ListComponent("New list");
		list.addTodo("New todo");

		expect(list.todos[0].ID).toBe(1);
		expect(list.todos[0].text).toBe("New todo");
	});

	test("Add To Do if not empty", () => {
		let list = ListComponent("New list");
		list.addTodo("");

		expect(list.todos.length).toBe(0);
	});

	test("Delete To Do", () => {
		let list = ListComponent("New list");
		list.addTodo("New todo");
		let todoID = list.todos[0].ID;
		list.deleteTodo(todoID);

		expect(list.todos.length).toBe(0);
	});

	test("Update name", () => {
		let list = ListComponent("New list");
		list.updateName("New name");

		expect(list.name).toBe("New name");
	});

	test("Update name if not empty", () => {
		let list = ListComponent("New list");
		list.updateName("");

		expect(list.name).toBe("New list");
	});
});
