const inquirer = require('inquirer');
const db = require('./db/connection');
const express = require('express');
const router = express.Router();
const sql = require('mysql2')


const menuQuestion = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'function',
            message: 'Choose the function you would like to perform:',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']

        },
        //when the user selects from the choices, they are directed to the next part of the process
    ]).then(response => {
        switch (response.function) {
            case 'view all departments':
                db.query(`SELECT * from department`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                });
                break;
            case 'view all roles':
                db.query(`SELECT * from role`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                });
                break;
            case 'view all employees':
                db.query(`SELECT * from employee`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                });
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateRole();
                break;

        }
    })

}
//Function to run for further inquirer prompts and to add new department
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the new department?"
        }
    ]).then(response => {
        db.query(`INSERT INTO department SET ?`, { name: response.department_name }, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
        });
        console.log(response)
    })
}
//Function to run for further inquirer prompts and to add new role
const addRole = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "role_title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id of the new role? Type in a number. 1=sales, 2=IT, 3=marketing, 4=HR"
        }
    ]).then(responses => {
        db.query(`INSERT INTO role SET ?`,
            {
                title: responses.role_title,
                salary: responses.salary,
                department_id: responses.department_id,
            }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });
        console.log(responses)
    })
}
//Function to run for further inquirer prompts and to add new employee
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role id of the new employee? Type in a number. 1=Senior Sales, 2=Junior Sales, 3=Senior IT, 4=Junior IT, 5=Senior Marketing, 6=Junior Marketing, 7=HR Manager, 8=HR Staff, 9=Accountant"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Type the number that corresponds to this employee's manager id."
        }
    ]).then(responses => {
        db.query(`INSERT INTO employee SET ?`,
            {
                first_name: responses.first_name,
                last_name: responses.last_name,
                role_id: responses.role_id,
                manager_id: responses.manager_id
            }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });
        console.log(responses)
    })
}
//Function to run for further inquirer prompts and to update the employee's role by id number
const updateRole = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "employeenum",
            message: "What is the id number of the employee whose role will be updated?"
        },
        {
            type: "input",
            name: "rolenum",
            message: "What is the new role number for this employee? Please type a number. 1=Senior Sales, 2=Junior Sales, 3=Senior IT, 4=Junior IT, 5=Senior Marketing, 6=Junior Marketing, 7=HR Manager, 8=HR Staff, 9=Accountant"
        }
    ]).then(responses => {
        db.query(`UPDATE employee SET role_id = ${responses.rolenum} WHERE id = ${responses.employeenum}; `,
             (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });
        console.log(responses)
    })
}


module.exports = router;
menuQuestion();