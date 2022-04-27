const inquirer = require('inquirer');
const db = require('./db/connection');
const express = require ('express');
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
                //insert function to display table here
                break;
            case 'view all roles':
                 //insert function to display roles
                break;
            case 'view all employees':
                //insert function to display employees
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
const addDepartment = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the new department?"
        }
    ]).then(response => {
        console.log(response)
    })
}

const addRole = () => {
    return inquirer.prompt ([
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
        console.log(responses)
    })
}
const addEmployee = () => {
    return inquirer.prompt ([
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
        console.log(responses)
    })
}
const updateRole = () => {
    return inquirer.prompt ([
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
        console.log(responses)
    })
}


module.exports = router;
menuQuestion();