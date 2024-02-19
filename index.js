const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const user = require('./users')
const role = require('./roles')
const activity = require('./activities')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', user.getUsers)
app.get('/users/:id', user.getUserById)
app.post('/users', user.createUser)
app.put('/users/:id', user.updateUser)
app.delete('/users/:id', user.deleteUser)

app.get('/roles', role.getRoles)
app.post('/roles', role.createRole)
app.put('/roles/:id', role.updateRole)
app.delete('/roles/:id', role.deleteRole)

app.get('/activity', activity.getActivities)
app.get('/activity/:id', activity.getActivityById)
app.post('/activity', activity.createActivity)
app.put('/activity/:id', activity.updateActivity)
app.delete('/activity/:id', activity.deleteActivity)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})