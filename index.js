const express = require('express');
const app = express();
const path = require('path');
const con = require('./connection');

// To pass data from form to server DB, need to convert data in JSON by encoding URL
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connecting with database
con.connect((err) => {
    if(err) throw err;
    console.log("connected")
});



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/form.html');

});



// To define route for POST method (To send data to database)

app.post('/', (req, res) => {

    // console.log(req.body);   ==> [The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json(). ]

    const name = req.body.name;
    const email = req.body.email;
    const mno = req.body.mno;



        var sql =   "INSERT INTO students (name, email, mno) VALUES (?, ?, ?)";

        con.query(sql, [name, email, mno ], (err, result) => {
            if(err) throw err;

            res.redirect('/students');
            // res.send(`Student Register successful ` +result.insertId);

        });
    });






app.get('/students', (req, res) => {
    

        var sql = "SELECT * FROM students";

        con.query(sql, (err, result) => {
            if (err) console.log(err);
            
             res.render('student', {students:result});
        });
    });




app.get('/delete-student', (req, res) => {
        
    var sql = "DELETE FROM students WHERE id = ?";

    //The req.query property is an object containing the property for each query string parameter in the route. 
    var id = req.query.id;

    con.query(sql, [id], (err, result) => {
        if(err) throw err;
        res.redirect('/students');
    })
})




app.get('/update-student', (req, res) => {

    var sql = "SELECT * FROM students WHERE id = ?";

    var id = req.query.id;

    con.query(sql, [id], (err, result) => {
        if(err) throw err;
        res.render('update', {update:result});
    })
})



app.post('/update-student', (req, res) => {

    // console.log(req.body);
    
    const name = req.body.name;
    const email = req.body.email;
    const mno = req.body.mno;

        var id = req.query.id;

        var sql =   "UPDATE students SET name = ?, email = ?, mno = ? WHERE id = ? ";
        
        con.query(sql, [name, email, mno, id], (err, result) => {
            if(err) throw err;

            res.redirect('/students');

        })
    });








app.listen(8000, () => {
    console.log("Listening");

})









// app.get('/students', (req, res) => {

//     const user = {
//         name : "ayushi",
//         email : "ayushi@gmail.com",
//         city : "jaipur",
//         skills : ['node', 'js', 'c++']
//     }
//     res.render('student',{user})

// })



// app.get('/login', (req, res) => {
//     res.render('login')
// })















// con.connect((err) => {
//     if(err) throw err;

//     console.log("connected !");

// })

// con.query('select * from users WHERE userID = 3',(err,result) => {
//     if(err) throw err;
//     console.log(result);
// })