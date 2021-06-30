const express = require('express')
const app = express()
const path = require('path')
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


app.get('/signup', (req,res) => {
    res.render('signup')

})

app.post('/signup', (req,res) => {
    let body = req.body
    let sql = `INSERT INTO users(first_name,last_name,email) VALUES('${body.first_name}','${body.last_name}','${body.email}')`
    connectdb.query(sql, (err,result) => {
        if (err) throw err
        console.log('user saved in db')
        res.redirect('/')
    })
})


app.listen(5000, () => {
    console.log('LISTENING ON PORT 5000')
})
