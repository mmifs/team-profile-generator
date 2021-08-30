const Manager = require("../lib/Manager");

describe('Manager', () => {
    it('Can set office number property', () => {
        const expectedValue = '416';
        const man = new Manager('Mike', 5, 'place@holder.com', expectedValue);
        expect(man.officeNumber).toBe('416');
    });

    it('Can return "Manager" as getRole() value', () => {
        const expectedValue = 'Manager';
        const man = new Manager('Mike', 5, 'place@holder.com', '416');
        expect(man.getRole()).toBe(expectedValue);
    });
});