// Mysql and node.js ( Connecting mysql with Node.js)

const mysql = require('mysql');

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "college"
});


module.exports = con;



// con.connect((err)=>{
//     if(err) throw err;
//     console.log("connected");
// })




//  ...........................................................To get data from database after connection

// con.query("select * from users", (err, result) =>{
//     if(err) throw err;
//     console.log(result);
// })



// Creating and Inserting data using Node.js in Mysql 



// var sql = "INSERT INTO users (name, age, city, Proff) VALUES ('Ram', 34, 'jalore', 'doc')";

// con.query(sql, (err) =>{
//     if(err) throw err;
//     console.log('Inserted')

// })


