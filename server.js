const inquirer = require("inquirer")
const mysql = require("mysql2")
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'mypass',
        database: 'Edata_db'
    })

db.connect(function () {
    console.log(`Connected to the movies_db database.`)
    boot()
});



function boot() {
    inquirer.prompt([
        {
            type: "list",
            message: "What...",
            name: "userchoice",
            choices: ["Add Department", "View Department", "Add Roles", "Delete Employee", "View Employee", "Exit", "New Roles", "New Employee","View Roles"] //added user choices via the node prompt

        }
    ]).then(({ userchoice }) => { //added user choices via the node prompt

        switch (userchoice) {
            case "Add Department":
                addDepartment();
                break;
            case "View Department":
                viewDepartment();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "View Employee":
                viewEmployee();
                break;
            case "Exit":
                exit();
                break;
            case "New Roles":
                newRoles();
                break;
            case "New Employee":
                newEmployee();
                break;


        }

    })
} 


function exit(){
 db.end()
 process.exit(0)   
}

function viewDepartment(){
    db.query("select * from department",function(err,data){
        if(err) throw err;
        console.table(data)
        boot()
    })
}

function viewRoles(){
    db.query("select * from roles",function(err,data){
        if(err) throw err;
        console.table(data)
        boot()
    })
}

function viewEmployee(){
    db.query("select * from employee",function(err,data){
        if(err) throw err;
        console.table(data)
        boot()
    })
}
