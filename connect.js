const mysql = require('mysql')

let connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Aryaman@9999",
    database:'aryaman',
    port:'3306'
})

module.exports = connect