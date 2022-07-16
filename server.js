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
    db.query("select * from employees",function(err,data){
        if(err) throw err;
        console.table(data)
        boot()
    })
}
function addDepartment(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter department name ?",
            name:"dname"
        }
    ]).then(({dname}) => {

        db.query(`insert into department(department_name) values(?);`,dname,function(err,data){
            if(err) throw err;
            console.table(data)
            boot()
        })
    })
    }

function newEmployee(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter Employee first name?",
            name:"Efname"
            
        },
        {
            type:"input",
            message:"Enter Employee last name?",
            name:"Elname"
            
        },
        {
            type:"list",
            message:"Enter role ID?",
            name:"roleID",
            choices:[
                {name:"Manager - Marketing",value:1},
                {name:'Manager - Sales',value:2},
                {name:'Manager - IT',value:3}

            ]
            
        },
    ]).then( response => {

        db.query(`INSERT into employees(first_name,last_name,role_id)values(?,?,?);`,
        [response.Efname,response.Elname,response.roleID],function(err,data){
            if(err) throw err;
            console.table(data)
            boot()
        })
    })
}

function addRoles(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter roles title ?",
            name:"Rtitle"
            
        },
        {
            type:"input",
            message:"Enter roles salary ?",
            name:"Rsalary"
            
        },
        {
            type:"list",
            message:"Enter department ?",
            name:"RdepartmentID",
            choices:[
                {name:"Marketing",value:1},
                {name:'Sales',value:2},
                {name:'IT',value:3}

            ]
            
        },
    ]).then( response => {

        db.query(`INSERT into roles(title,salary,department_id)values(?,?,?);`,
        [response.Rtitle,response.Rsalary,response.RdepartmentID],function(err,data){
            if(err) throw err;
            console.table(data)
            boot()
        })
    })
}

function deleteEmployee(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter Employee ID",
            name:"Demployee",
        }
    ]).then(({Demployee}) => {

        db.query(`delete from employees where id = ?;`,Demployee,function(err,data){
            if(err) throw err;
            console.table(data)
            boot()
        })
    })
    }
