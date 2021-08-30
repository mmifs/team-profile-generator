const Engineer = require("../lib/Engineer");

describe('Engineer', () => {
    it('Can set git username property', () => {
        const testGit = 'GitUserName'
        const eng = new Engineer('Mike', 5, 'place@holder.com', testGit);
        expect(eng.github).toBe('GitUserName');
    });

    it('Can return "Engineer" with getRole()', () => {
        const expectedValue = 'Engineer';
        const eng = new Engineer('Mike', 5, 'place@holder.com', 'gitUserName');
        expect(eng.getRole()).toBe(expectedValue);
    });
});