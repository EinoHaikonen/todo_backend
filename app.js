// Express on http:tä miellyttävämmän ohjelmointirajapinnan tarjoava kirjasto.
const express = require('express')
const app = express()
// Middleware Cors mahdollistaa kommunikoinnin eri originissa olevan palvelimen kanssa
const cors = require('cors')
const todosRouter = require('./controllers/todos')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const url = 'mongodb+srv://einohaikonen:ToDoHarjoitus@cluster0.io67a9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)


mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
/*  Jotta saamme Expressin näyttämään staattista sisältöä eli sivun index.html ja sen lataaman JavaScriptin ym.
    Express GET-tyyppisten HTTP-pyyntöjen yhteydessä tarkastetaan ensin löytyykö pyynnön polkua vastaavan nimistä tiedostoa hakemistosta build. 
    Jos löytyy, palauttaa Express tiedoston. */
app.use(express.static('build'))
app.use(express.json())
app.use('/api/todos', todosRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app