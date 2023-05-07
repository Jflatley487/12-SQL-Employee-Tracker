// Require necessary packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jayeff87!',
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


    mainMenu(connection);
  });
}

// Function to view all roles
function viewRoles(connection) {
  console.log('/n');
  console.log('All Rolls');
  console.log('-------------------------');

  const query = `SELECT * FROM roles`;

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);

    mainMenu(connection);
  });
}

// Function to view all employees
function viewEmployees(connection) {
  console.log('\n');
  console.log('All Employees');
  console.log('-------------------------');

  const query = `SELECT * FROM employees`;

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);

    mainMenu(connection);
  });
}

// Function to add a department
function addDepartment(connection) {
  inquirer.prompt({
      name: 'department',
      type: 'input',
      message: 'what is the name of the department',
    })
    .then((answer) => {
      const query = `INSERT INTO departments (name) VALUES ('${answer.department}')`;

      connection.query(query, (err, res) => {
        if (err) throw err;

        console.log(`Added department: ${answer.department}`);

        mainMenu(connection);
      })
    })
}

// Function to add a role
function addRole(connection) {
  inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the title of the role?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for the role?',
      },
      {
        name: 'department',
        type: 'input',
        message: 'What is the department ID for the role?',
      },
    ])
    .then((answer) => {
      const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.department})`;

      connection.query(query, (err, res) => {
        if (err) throw err;

        console.log('Added role: ${answer.title}');

        mainMenu(connection);
      });
    });
}

// Function to add an employee
function addEmployee(connection) {
  inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the employee\'s first name?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the employee\'s last name?',
      },
      {
        name: 'role',
        type: 'input',
        message: 'What is the employee\'s role ID?',
      },
      {
        name: 'manager',
        type: 'input',
        message: 'What is the employee\'s manager ID? (Leave blank if none)',
      },
    ])
    .then((answer) => {
      const managerId = answer.manager ? answer.manager : null;
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role}, ${managerId})`;

      connection.query(query, (err, res) => {
        if (err) throw err;

        console.log(`Added employee: ${answer.firstName} ${answer.lastName}`);

        mainMenu(connection);
      });
    });
}
// Function to update an employee's role
function updateEmployeeRole(connection) {
  inquirer.prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'What is the ID of the employee whose role you want to update?',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'What is the ID of the new role for the employee?',
      },
    ])
    .then((answer) => {
      const query = `UPDATE employees SET role_id=${answer.roleId} WHERE id=${answer.employeeId}`;

      connection.query(query, (err, res) => {
        if (err) throw err;

        console.log(`Updated employee ${answer.employeeId}'s role to ${answer.roleId}`);

        mainMenu(connection);
      });
    });
}









