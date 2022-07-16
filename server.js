const inquirer = require("inquirer")
const mysql = require("mysql2")
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'mypass',
      database: 'Edata_db'
    })

    db.connect(function(){
    console.log(`Connected to the movies_db database.`)
    boot()
    });



function boot(){
    inquirer.prompt([
        {

        }
    ])
} 