// Require necessary packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jayeff87!', // Replace with your MySQL password
  database: 'employee_db',
});

// Connect to the database and start application
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
  start();
});

// Displays the main menu prompt and calls the appropriate function based on user input
function mainMenu(connection) {
    inquirer
      .prompt({
        name: 'mainMenu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Return to main menu', 'Exit'],
      })
      .then((answer) => {
        if (answer.mainMenu === 'Return to main menu') {
          start(connection);
        } else {
          connection.end();
        }
      });
  }

// Function to prompt user with options and call appropriate functions based on choice
function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments(connection);
          break;
        case 'View all roles':
          viewRoles(connection);
          break;
        case 'View all employees':
          viewEmployees(connection);
          break;
        case 'Add a department':
          addDepartment(connection);
          break;
        case 'Add a role':
          addRole(connection);
          break;
        case 'Add an employee':
          addEmployee(connection);
          break;
        case 'Update an employee role':
          updateEmployeeRole(connection);
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments(connection) {
    console.log('\n');
    console.log('All Departments');
    console.log('-------------------------');
  
    const query = `SELECT * FROM departments`;
  
    connection.query(query, (err, res) => {
      if (err) throw err;
  
      console.table(res);
      
      //todo: define this function
      mainMenu(connection);
    });
  }

// Function to view all roles
function viewRoles(connection) {
  // Your code here
  console.log('roles here :)');
  mainMenu(connection); 
}

// Function to view all employees
function viewEmployees(connection) {
  // Your code here
  console.log('emplyees here :)');
  mainMenu(connection);
}

// Function to add a department
function addDepartment(connection) {
  // Your code here
  console.log('depts here :)');
  mainMenu(connection);
}

// Function to add a role
function addRole(connection) {
  // Your code here
  console.log('adding roles here :)');
  mainMenu(connection);
}

// Function to add an employee
function addEmployee(connection) {
  // Your code here
  console.log('adding emps here :)');
  mainMenu(connection);
}

// Function to update an employee's role
function updateEmployeeRole(connection) {
  // Your code here
  console.log('updating emps here :)');
  mainMenu(connection);
}

