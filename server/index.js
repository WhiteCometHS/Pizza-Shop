const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql");

const bcrypt = require('bcrypt');
const saltRounds=10;

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop" 
});
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized:false,
    cookie:{
        expires: 60*60
    }
}));

app.post("/register", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password,saltRounds,(err, hash)=>{
        if(err){
            console.log(err);
        }
        db.query("INSERT INTO users (username, password) VALUES (?,?)",
        [username, hash],
        (err, result)=>{
            console.log(err);
        });
    });


});

app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?;",
    username,
    (err, result)=>{
        if(err) res.send({err: err});

        if(result.length > 0){
            bcrypt.compare(password, result[0].password,(error,response)=>{
                if(response){
                    req.session.user=result
                    res.send(result)
                }else{
                    res.send({message: "Wrong username/password combination"});
                }
            })
        }else{
            res.send({message: "User doesn't exist"});
        }
    });
});

app.get("/api/get",(rq,res)=>{
    const sqlSelect = "SELECT * FROM pizza";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    })
})

app.post("/api/insert",(req,res)=>{
        const nazwa = req.body.nazwa;
        const opis = req.body.opis;
        const sqlInsert = "INSERT INTO pizza (nazwa, opis, file) VALUES (?,?,?)";
        db.query(sqlInsert, [nazwa, opis], (err, result)=>{
            console.log(result);
        })
    
});

app.delete("/api/delete/:id",(req, res)=>{
    const name = req.params.id;
    const sqlDelete = "DELETE FROM pizza WHERE id = ?";
    db.query(sqlDelete, name, (err, result)=>{
        if(err) console.log(err);
    });
});

app.put("/api/update/:id",(req, res)=>{
    const id = req.params.id;
    const nazwa = req.body.nazwa;
    const opis = req.body.opis;
    const sqlUpdate = "UPDATE pizza SET nazwa=?, opis=? WHERE id=?";
    db.query(sqlUpdate, [nazwa,opis,id], (err, result)=>{
        if(err) console.log(err);
    });
});

app.listen(3001,()=>{
    console.log("running on port 3001");
});