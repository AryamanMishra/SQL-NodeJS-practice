const express = require('express')
const app = express()
const path = require('path')
const uniqid = require('uniqid')
const connectdb = require('./connect')

connectdb.connect((err) => {
    if (err) throw err
    console.log('mysql connection confirmed')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req,res) => {
    res.render('home')
    
})

app.get('/users', (req,res) => {
    connectdb.query('SELECT * FROM users', (err,result) => {
        if (err) throw err;
        let users = result
        res.render('users', {users})
    })
})


app.get('/login', (req,res) => {
    res.render('login')
})


app.post('/login', (req,res) => {
    let body = req.body
    let sql = `SELECT * FROM users WHERE password= '${body.password}' AND first_name = '${body.first_name}' AND last_name = '${body.last_name}'`
    connectdb.query(sql, (err,result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') {
            res.render('loginError')
        } 
        else {
            res.redirect(`/users/${result[0].id}`)
        }
    })
})


app.get('/signup', (req,res) => {
    res.render('signup')

})

app.post('/signup', (req,res) => {
    let body = req.body
    let id = uniqid()
    let sql = `SELECT * FROM users WHERE password= '${body.password}' AND first_name = '${body.first_name}' AND last_name = '${body.last_name}'`
    connectdb.query(sql, (err,result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') {
            let id = uniqid()
            let sql = `INSERT INTO users(first_name,last_name,id,password) VALUES('${body.first_name}','${body.last_name}','${id}','${body.password}')`
            connectdb.query(sql, (err,result) => {
                if (err) throw err;
                console.log('user saved in db')
                res.redirect(`/users/${id}`)
            })
        }
        else {
            console.log('user already exists')
            res.redirect(`/users/${result[0].id}`)
        }
    })
})


app.get('/users/:id', (req,res) => {
    const id = req.params.id
    let sql = `SELECT * FROM USERS WHERE id = '${id}'`;
    connectdb.query(sql, (err,result) => {
        if (err) throw err
        res.render('userProfile', {result})
    })
})

app.listen(5000, () => {
    console.log('LISTENING ON PORT 5000')
})
