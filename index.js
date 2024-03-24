const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

/*  Jotta saamme Expressin näyttämään staattista sisältöä eli sivun index.html ja sen lataaman JavaScriptin ym.
    Express GET-tyyppisten HTTP-pyyntöjen yhteydessä tarkastetaan ensin löytyykö pyynnön polkua vastaavan nimistä tiedostoa hakemistosta build. 
    Jos löytyy, palauttaa Express tiedoston. */
app.use(express.static('build'))

let todos = [
    {
        "task": "Tiskaa",
        "id": 1,
        "check": false
    },
    {
        "task": "Imuroi",
        "id": 2,
        "check": false
    },
    {
        "task": "Jotain",
        "id": 3,
        "check": false
    }
]

/*

Tästä alkaa polkujen määrittelyt

*/


// Kaikkien tietojen haku
app.get('/api/todos', (request, response) => {
    response.json(todos)
})


// Yksittäisen todo:n haku
app.get('/api/todos/:id', (request, response) => {
    const id = Number(request.params.id)
    const todo = todos.find(todo => todo.id === id)

    if (todo) {
        response.json(todo)
    } else {
        response.status(404).end()
    }
})


// Yksittäisen todo:n poisto
app.delete('/api/todos/:id', (request, response) => {
    const id = Number(request.params.id)
    todos = todos.filter(todo => todo.id !== id)
  
    response.status(204).end()
})

// Uuden id:n generointi funktio
const generateId = () => {
    const maxId = todos.length > 0
    // Taulukko muutettu luvuiksi (...todos) 
    // koska taulukko ei kelpaa Math.maxi:lle
    ? Math.max(...todos.map(todo => todo.id)) 
    : 0
    return maxId + 1
}

// Uuden todon: teko
app.post('/api/todos', (request, response) => {
    
    const todo = {
        task: request.body.task,
        id: generateId(),
        check: false
    }

    todos = todos.concat(todo)

    console.log(todo)
    response.json(todo)
})

// Check merkin muutos
app.put('/api/todos/:id', (request, response) => {
    const id = Number(request.params.id)
    const updatedTodos = todos.map(toDo => {
        if (toDo.id === id) {
          toDo.check = !toDo.check
        } return toDo
      })
      todos = updatedTodos
      response.json(todos)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
