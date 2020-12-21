USE employee_db; 

-- Inserted a set of records into each table
INSERT INTO department (name)
VALUES ("engineering"), ("legal"), ("finance"), ("sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("sales lead", 100000, 4), ("salesperson", 80000, 4), ("lead engineer", 150000, 1), ("software engineer", 120000, 1), 
("accountant", 125000, 3), ("lawyer", 190000, 2), ("lead attorney", 250000, 2); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fred", "Sanford", 1, NULL), ("Lamont", "Sanford", 1, NULL); 

SELECT * FROM department;

SELECT * FROM roles; 

SELECT * FROM employee; 