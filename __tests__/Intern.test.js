const Intern = require("../lib/Intern");

describe('Intern', () => {
    it('Can set school property', () => {
        const expectedValue = 'UofT';
        const int = new Intern('Mike', 5, 'place@holder.com', expectedValue);
        expect(int.school).toBe('UofT');
    });

    it('Can return "Intern" as getRole() value', () => {
        const expectedValue = 'Intern';
        const int = new Intern('Mike', 5, 'place@holder.com', 'UofT');
        expect(int.getRole()).toBe(expectedValue);
    });
});