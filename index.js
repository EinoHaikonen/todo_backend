// Express on http:tä miellyttävämmän ohjelmointirajapinnan tarjoava kirjasto.
const express = require('express')
const app = express()
const cors = require('cors')
const ToDo = require('./models/database')

app.use(express.json())
app.use(cors())

/*  Jotta saamme Expressin näyttämään staattista sisältöä eli sivun index.html ja sen lataaman JavaScriptin ym.
    Express GET-tyyppisten HTTP-pyyntöjen yhteydessä tarkastetaan ensin löytyykö pyynnön polkua vastaavan nimistä tiedostoa hakemistosta build. 
    Jos löytyy, palauttaa Express tiedoston. */
app.use(express.static('build'))



/*

Tästä alkaa polkujen määrittelyt

*/


// Kaikkien tietojen haku
app.get('/api/todos', async (request, response) => {
    const todos = await ToDo.find({})
    response.json(todos)
})


// Yksittäisen todo:n haku
app.get('/api/todos/:id', async (request, response) => {
    const id = request.params.id
    const todo = await ToDo.findById(id)
        if (todo) {
            response.json(todo)
        } else {
            response.status(404).end()
        }
    })


// Yksittäisen todo:n poisto
app.delete('/api/todos/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        await ToDo.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        next(error)
        }
})


// Uuden id:n generointi funktio
/*const generateId = () => {
    const maxId = todos.length > 0
    // Taulukko muutettu luvuiksi (...todos) 
    // koska taulukko ei kelpaa Math.maxi:lle
    ? Math.max(...todos.map(todo => todo.id)) 
    : 0
    return maxId + 1
} */

/*const generateId = () => {
ToDo.find ({}).then(todos => {
    const maxId = todos.length > 0
    ? Math.max(...todos.map(todo => todo.id)) 
    : 0
    return maxId + 1
    })
}*/

// Uuden todon: teko
app.post('/api/todos', async (request, response) => {   
    const todo = new ToDo({
        task: request.body.task,
        check: false
    })
    const savedTodo = await todo.save();
    response.json(savedTodo)
})


// Check merkin muutos
app.put('/api/todos/:id', async (request, response) => {
    const id = request.params.id
    const todo = await ToDo.findByIdAndUpdate(id)
    todo.check = !todo.check
    const savedTodo = await todo.save()
    response.json(savedTodo)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
