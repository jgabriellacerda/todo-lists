/**
 * @jest-environment jsdom
 */

const ListComponent = require("./ListComponent.js");

describe("ListComponent.js", function () {
	test("Create list", () => {
		let list = ListComponent("New list");

		expect(list.name).toBe("New list");
		expect(list.todos).toStrictEqual([]);
	});

	test("Add To Do", () => {
		let list = ListComponent("New list");
		list.pushTodo({ id: 1, list_id: 1, task: "New todo" });

		expect(list.todos[0].id).toBe(1);
		expect(list.todos[0].task).toBe("New todo");
	});

	test("Add To Do if not empty", () => {
		let list = ListComponent("New list");

		if (list.checkTodoTask("")) {
			list.pushTodo("");
		}

		expect(list.todos.length).toBe(0);
	});

	test("Delete To Do", () => {
		let list = ListComponent("New list");
		list.pushTodo({ id: 1, list_id: 1, name: "New todo" });
		let todo_id = list.todos[0].id;
		list.popTodo(todo_id);

		expect(list.todos.length).toBe(0);
	});

	test("Update name", () => {
		let list = ListComponent("New list");
		list.setName("New name");

		expect(list.name).toBe("New name");
	});

	test("Set name if not empty", () => {
		let list = ListComponent("New list");
		list.setName("");

		expect(list.name).toBe("New list");
	});
});
