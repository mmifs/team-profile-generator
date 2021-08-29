const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const fs = require('fs');
var inquirer = require('inquirer');

function runApp() {
    firstHtml();
    addEmployee();
}

const employees = [];

/*function Employee(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
} */

function firstHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profiles</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    <body>
        <div>
            <nav class="navbar navbar-light bg-danger">
                <span class="text-white">My Team</span>
            </nav>
            <div class="row" style="padding-top: 50px;">`
    fs.writeFile('./output/team.html', html, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function addCard(emp) {
    return new Promise(function(resolve, reject) {
        const name = emp.getName();
        const role = emp.getRole();
        const id = emp.getId();
        const email = emp.getEmail();
        let data = '';
        if (role === "Intern") {
            const school = emp.getSchool();
            data = `<div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                        ${name} <br> <br>
                        Intern
                    </h5>
                  <p class="card-text">
                      ID: ${id} <br> <br>

                      Email: <a href='mailto:${email}'>${email}<a> <br> <br>

                      School: ${school}
                    </p>
                </div>
              </div>
        </div>`
        } else if (role === 'Engineer') {
            const gitHub = emp.getGit();
            data = `<div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                        ${name} <br> <br>
                        Engineer
                    </h5>
                  <p class="card-text">
                      ID: ${id} <br> <br>

                      Email: <a href='mailto:${email}'>${email}<a> <br> <br>

                      Github: ${gitHub}
                    </p>
                </div>
              </div>
        </div>`
        } else {
            const officeNumber = emp.getOfficeNumber();
            data = `<div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                        ${name} <br> <br>
                        Manager
                    </h5>
                  <p class="card-text">
                      ID: ${id} <br> <br>

                      Email: <a href='mailto:${email}'>${email}<a> <br> <br>

                      Office Number: ${officeNumber}
                    </p>
                </div>
              </div>
        </div>`
        }
        fs.appendFile('./output/team.html', data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function lastHtml() {
    const html = `
                </div>
            </div>
        </body>
    </html>`;
    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the employee's name?"
            },
            {
                type: 'list',
                name: 'role',
                choices: ['Manager', 'Engineer', 'Intern'],
                message: "What is the employee's role?"
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the employee's ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the employee's Email Address?"
            }])
            .then(function({name, role, id, email}) {
                let info = "";
                if (role === "Intern") {
                    info = "school name";
                } else if (role === "Engineer") {
                    info = "GitHub name";
                } else {
                    info = "office phone number";
                }
                inquirer.prompt([{
                    message: `What is this ${role}'s ${info}?`,
                    name: "info"
                },
                {
                    type: "confirm",
                    message: "Would you like to add more team members?",
                    name: "addEmp"
                }])
                .then(function({info, addEmp}) {
                    let newEmp;
                    if (role === 'Intern') {
                        newEmp = new Intern(name, id, email, info);
                    } else if (role === "Engineer") {
                        newEmp = new Engineer(name, id, email, info);
                    } else {
                        newEmp = new Manager(name, id, email, info)
                    }
                    employees.push(newEmp);
                    addCard(newEmp) // define add card
                    .then(function() {
                        if (addEmp) {
                            addEmployee();
                        } else {
                            lastHtml();
                        }
                    });
                });
        });
};

runApp();