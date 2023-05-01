-- Using the employee database
USE employee_db;

-- Insert data into departments table
INSERT INTO departments (id, name) VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Finance'),
  (4, 'Legal');

-- Insert data into roles table
INSERT INTO roles (id, title, salary, department_id) VALUES
  (1, 'Salesperson', 60000.00, 1),
  (2, 'Sales Manager', 90000.00, 1),
  (3, 'Software Engineer', 80000.00, 2),
  (4, 'Lead Engineer', 120000.00, 2),
  (5, 'Accountant', 75000.00, 3),
  (6, 'Financial Analyst', 90000.00, 3),
  (7, 'Lawyer', 100000.00, 4),
  (8, 'Legal Assistant', 50000.00, 4);

-- Insert data into employees table
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 2, NULL),
  (2, 'Jane', 'Smith', 3, 1),
  (3, 'Bob', 'Johnson', 1, 2),
  (4, 'Sarah', 'Davis', 3, 1),
  (5, 'Mike', 'Jones', 4, 2),
  (6, 'Lisa', 'Garcia', 1, 3),
  (7, 'David', 'Brown', 2, 1),
  (8, 'Karen', 'Lee', 4, 2),
  (9, 'Tom', 'Wilson', 3, 1),
  (10, 'Amy', 'Nguyen', 5, 3),
  (11, 'Mark', 'Taylor', 6, 2),
  (12, 'Emily', 'Anderson', 7, 4),
  (13, 'Jessica', 'Wang', 8, 4),
  (14, 'Steve', 'Chen', 3, 1),
  (15, 'Melissa', 'Davis', 4, 2);
