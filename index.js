const inquierer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const cTable = require('console.table');

// connection to SQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeetracker'
})

// formulas to help other ones run smoothly
// take name from list and grab the ID from the relevant table
const nameToID = (list, name) => {
    for (i = 0; i < list.length; i++) {
        if (list[i] === name) {
            return (i + 1);
        }
    }
    // return (NULL);
}

// take table from connection.query and turn it into a list
const tableToList = (table) => {
    let list = [];
    for (let i = 0; i < table.length; i++) {
        list = list.concat(table[i].name);
    };
    return (list);
};

// formulas for the user's selection of how to manage the databse
const viewDepartments = () => {
    connection.query(
        `SELECT * FROM departments`,
        function (err, results) {
            console.table(results);
        }
    );
    showOptions();
};

const viewRoles = () => {
    connection.query(
        `SELECT * FROM roles`,
        function (err, results) {
            console.table(results);
        }
    );
    showOptions();
};

const viewEmployees = () => {
    connection.query(
        `SELECT * FROM employees`,
        function (err, results) {
            console.table(results);
        }
    );
    showOptions();
};

const addDepartment = () => {
    inquierer.prompt({
        type: 'text',
        name: 'name',
        message: 'Enter the name of the department: '
    })
        .then(({ name }) => {
            connection.query(
                `INSERT INTO departments (name) VALUES (?)`,
                name,
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Department of ' + name + ' succesfully added.');
                    showOptions();
                });
        });
};

const addRole = async () => {
    getDepartmentList = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT name FROM departments`,
                (err, results) => {
                    return resolve(results);
                }
            )
        })
    };

    let nameList = tableToList(await getDepartmentList());

    inquierer.prompt([
        {
            type: 'text',
            name: 'title',
            message: 'Enter the title of the role: '
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary of the role (ex: 50000): '
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department is the role in?',
            choices: nameList
        }
    ])
        .then(({ title, salary, department }) => {
            console.log("title: " + title);
            console.log("salary: " + salary);
            console.log("department ID: " + nameToID(nameList, department));
            connection.query(
                `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
                [title, salary, nameToID(nameList, department)],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Role of ' + title + ' successfully added.');
                    showOptions();
                }
            );
        });
};

const addEmployee = () => {

};

const updateRole = () => {

};

// Present list of options to choose from
const showOptions = () => {
    console.log('\n');
    inquierer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ]).then(({ option }) => {
        // console.log(option);
        switch (option) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
        }
    });
};

showOptions();