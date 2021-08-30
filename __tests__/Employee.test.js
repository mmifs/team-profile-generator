const Employee = require("../lib/Employee");

describe('Employee', () => {
    it('Can set name property', () => {
        const name = 'Mike';
        const emp = new Employee(name);
        expect(emp.name).toBe('Mike');
    });

    it('Can set id property', () => {
        const name = 'Mike';
        const idTest = 5;
        const emp = new Employee(name, idTest);
        expect(emp.id).toBe(5)
    });

    it('Can set email property', () => {
        const emailTest = 'place@holder.com';
        const name = 'Mike';
        const idTest = 5;
        const emp = new Employee(name, idTest, emailTest);
        expect(emp.email).toBe('place@holder.com')
    });


})