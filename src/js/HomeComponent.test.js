/**
 * @jest-environment jsdom
 */

const HomeComponent = require("./HomeComponent");
const ListComponent = require("./ListComponent");

describe("HomeComponent.js", function () {
	test("Create home component", () => {
		let home = HomeComponent();

		expect(home.lists).toStrictEqual([]);
	});

	test("Add list", () => {
		let home = HomeComponent();

		let list = ListComponent("List", 1, 1);
		home.pushList(list);

		expect(home.lists.length).toBe(1);
		expect(home.lists[0].id).toBe(1);
		expect(home.lists[0].name).toBe("List");
	});

	test("Delete list", () => {
		let home = HomeComponent("New list");
		let list = ListComponent("List", 1, 1);

		home.pushList(list);
		let list_id = home.lists[0].id;
		home.popList(list_id);

		expect(home.lists.length).toBe(0);
	});
});
