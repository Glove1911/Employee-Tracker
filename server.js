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

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: 'actions',
            type: 'rawlist',
            message: 'What would you like do?',
            choices: [
                'Add Employee', 'Add Department', 'Add Role', 'View All Employees', 'View All Departments', 'View All Roles','Update Employee Role', 'Remove Employee', 'Exit'
            ]
        })

        .then(function (answer) {
            switch (answer.actions) {

                case 'Add Employee':
                    addEmployee()
                    break;

                case 'Add Departmemt':
                    addDepartment()
                    break;

                case 'Add Role':
                    addRole()
                    break;

                case 'View All Employees':
                    viewAll()
                    break;

                case 'View All Departments':
                    viewDepartment()
                    break;

                case 'View All Roles':
                    viewRole()
                    break;


                case 'Update Employee Role':
                    upDateRole()
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

function addDepartment(){
    inquirer.prompt({
        
            name: 'add_department',
            type: 'input',
            message: 'Enter name of department you would like to add.'
        })

    .then(function (answer){

        const query = connection.query(
            'INSERT INTO department SET ?',
            {
                department: answer.add_department
            },
            function (err, res){
                if (err) throw err;
                start();
            }
        );
    });
}

function addRole(){
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'Enter role you would like to add.'
        },

        {
            name: 'salary',
            type: 'input',
            message:  'Enter Salary for role.'
        },
        {
            name: 'dept_id',
            type: 'input',
            message:  'Enter the department id.'
        }
    ])
    
    .then(function (answer){
        const query = connection.query(
            'INSERT INTO roles SET ?',
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.dept_id

            },
            function (err,res){
                if (err) throw err;
                console.table(res);
            }
        )
    });
}


function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter employee' + 's' + ' first name'
            },

            {
                name: 'last_name',
                type: 'input',
                message: 'Enter employee' + 's' + ' last name'
            },

            {
                name: 'role',
                type: 'list',
                message: 'Enter employee' + 's' + ' role id',
                choices: [
                    '1', '2', '3', '4', '5', '6', '7'
                ]
            }

        ])

        .then(function (answer) {
            const query = connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role

                },

                function (err, res) {
                    if (err) throw err;
                    viewAll();
                    start();
                }

            );
        });

}

function upDateRole() {

    connection.query('SELECT * FROM employee', function (err, res) {
        //console.log(res);
        var empsNames = [];
        for (var i = 0; i < res.length; i++) {
           var fullName = res[i].first_name +  ' ' + res[i].last_name;
            empsNames.push(fullName);
            
        }
        console.log('PPls name to choose from!!',empsNames);

        connection.query('SELECT * FROM roles', function (err, roleRes) {
            console.log('ALL ROLES FORM DB!!',roleRes);
            var roleTitles = [];
            for (var i = 0; i < roleRes.length; i++) {
                roleTitles.push(roleRes[i].title);
               
            }

            console.log('ALL THE ROLES', roleTitles);
            inquirer
        .prompt([
            {
                name: 'update_employee',
                type: 'list',
                message: 'Select employee to update',
                choices: empsNames
            },

            {
                name: 'update_role',
                type: 'list',
                message: 'Select new role',
                choices: roleTitles
            },

        

        ])

        .then(function (answer) {
            var roleIdToUpdate;

            for (var i = 0; i < roleRes.length; i++){
                if (roleRes[i].title === answer.update_role){
                    console.log(roleRes[i])
                    roleIdToUpdate = roleRes[i].id
                }
            }

            var employeeUPdate;

            for (var i = 0; i < res.length; i++){
                
                if (res[i].first_name +  ' ' + res[i].last_name === answer.update_employee){
                    console.log(res[i])
                    employeeUPdate= res[i].id
                }
            }
            console.log('role id to update to ', roleIdToUpdate)
            console.log('Employe id to update', employeeUPdate)

                connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    role_id: roleIdToUpdate
                  },
                  {
                    id: employeeUPdate
                  }
                ],
                function(err, res) {
                  if (err) throw err;
                  console.log(res);
                  
                }
              );
            console.log('what the chose', answer)
        });

        });
    });
}

function viewRole(){
    const query = 'SELECT * FROM roles'

    connection.query(query, function (err,res){
        if (err) throw err;
        console.table(res);
    })
}

function viewDepartment(){
    const query = 'SELECT * FROM department'

    connection.query(query,function(err,res){
        if (err) throw err;
        console.table(res);
    });
}

function removeEmployee(){
    connection.query('SELECT * FROM employee', function (err, res) {
        //console.log(res);
        var empsNames = [];
        for (var i = 0; i < res.length; i++) {
           var fullName = res[i].first_name +  ' ' + res[i].last_name;
            empsNames.push(fullName);
        }

    inquirer.prompt(
        {  
            name: 'remove_emp',
            type: 'list',
            message: 'Select employee to remove.',
            choices: empsNames


    })

    .then(function(answer){
        var delEmployee;
        for (var i = 0; i < res.length; i++){
            if (res[i].first_name +  ' ' + res[i].last_name === answer.remove_emp){
                console.log(res[i])
                delEmployee = res[i].id
            }
        }
    
    
        connection.query(
            'DELETE FROM employee WHERE ?',
            {
                id: delEmployee
            },
            function(err, res){
                if (err) throw err;
                viewAll();
            }
            
        );
            

    });
            
});    


            
}
    

function viewAll() {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary From employee INNER JOIN roles ON (roles.id = employee.role_id) INNER JOIN department ON (department.id = roles.department_id)'

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
        // connection.end();
    })
}

