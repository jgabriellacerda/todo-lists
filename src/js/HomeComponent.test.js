/**
 * @jest-environment jsdom
 */

const HomeComponent = require("./HomeComponent");

describe("HomeComponent.js", function () {
	test("Create home component", () => {
		let home = HomeComponent();

		expect(home.lists).toStrictEqual([]);
	});

	test("Add list", () => {
		let home = HomeComponent();
		home.addList();

		expect(home.lists.length).toBe(1);
		expect(home.lists[0].ID).toBe(1);
		expect(home.lists[0].name).toBe("Nova lista");
	});

	test("Delete list", () => {
		let home = HomeComponent("New list");
		home.addList();
		let listID = home.lists[0].ID;
		home.deleteList(listID);

		expect(home.lists.length).toBe(0);
	});
});
