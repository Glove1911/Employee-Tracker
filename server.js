const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Torie1911",
    database: "employee_db",
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start(){
    inquirer
        .prompt({
            name: 'actions',
            type: 'rawlist',
            message: 'What would you like do?',
            choices: [
                 'Add Employee',  'View All Employees', 'View All Employees by Department','View All Employees by Role', 'View All Employee Roles', 'Update Employee role' ,'Remove Employee', 'Exit'
            ]
        })
      
        .then(function(answer){
            switch (answer.actions){

                case 'Add Employee':
                    addEmployee()
                    break;

                case 'View All Employees':
                    viewAll()
                    break;
                    
                case 'View All Employees by Department':
                    viewByDepartment()
                    break;

                case 'View All Employees by Role':
                    viewByRole()
                    break;

                case 'View All Employee Roles':
                    viewEmployeeRoles()
                    break;

                case 'Update Employee Role':
                    updateEmployeeRoles()
                    break;

                case 'Remove Employee':
                    removeEmployee()
                    break;

                case 'Exit':
                    exit()
                    break;
            
            }
        });
}

function viewAll(){
    connection.query('SELECT * FROM employee', function (err,res){
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}

