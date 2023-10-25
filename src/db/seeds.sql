-- Seed data for the department table
INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Finance'),
(4, 'Engineering'),
(5, 'Human Resources');

-- Seed data for the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Representative', 50000.00, 1),
(2, 'Marketing Manager', 60000.00, 2),
(3, 'Financial Analyst', 55000.00, 3),
(4, 'Software Engineer', 70000.00, 4),
(5, 'HR Specialist', 48000.00, 5);

-- Seed data for the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, NULL),
(3, 'Michael', 'Johnson', 3, NULL),
(4, 'Emily', 'Williams', 4, 1),
(5, 'David', 'Brown', 4, 1),
(6, 'Sarah', 'Davis', 2, 2),
(7, 'Robert', 'Lee', 5, 3),
(8, 'Lisa', 'Wilson', 1, 1);
