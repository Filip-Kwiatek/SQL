const rake = require('node-rake')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const { response, request } = require('express')
const port = 3000

app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/new', (request, response) =>{
  return response.render('new.pug')
})

app.post('/lata', (request, response) =>{
  const newUser = db.createUser(request)
  return response.render('base.pug',{ newUser: newUser })
})

app.get('/lata', (request, response) =>{
  const s = [
    {name: "xD",day_of_week: "4", time_start: "2012-04-04", time_end: "2012-94-43"},
    {name: "xD22",day_of_week: "422", time_start: "2012-042-04", time_end: "2012-94-43"}
  ]
  return response.render('base.pug')
})

app.get('/new', (request, response) =>{
  return response.render('new-post.pug', { users: response })
})

// app.get('/addData', (request, response) =>{
//   return db.createUser(request, response)
// })

app.post('/addData', (request, response) =>{
  return db.createUser(request, response);
})

app.get('/', db.getPosts)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

