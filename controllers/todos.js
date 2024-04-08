const todosRouter = require('express').Router()
const Todo = require('../models/todo')
const User = require('../models/user')

/*

Tästä alkaa polkujen määrittelyt

*/


// Kaikkien tietojen haku
todosRouter.get('/', async (request, response) => {
    const todos = await Todo.find({})
    response.json(todos)
})


// Yksittäisen todo:n haku
todosRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const todo = await Todo.findById(id)
        if (todo) {
            response.json(todo)
        } else {
            response.status(404).end()
        }
    })


// Yksittäisen todo:n poisto
todosRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        await Todo.findByIdAndDelete(id)
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
todosRouter.post('/', async (request, response) => {  
    const body = request.body 
    const user = await User.findById(body.userId)
    const todo = new Todo({
        task: body.task,
        check: body.check,
        user: user._id
    })
    const savedTodo = await todo.save()
    user.todos = user.todos.concat(savedTodo._id)
    await user.save()
    response.json(savedTodo)
})


// Check merkin muutos
todosRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const todo = await Todo.findByIdAndUpdate(id)
    todo.check = !todo.check
    const savedTodo = await todo.save()
    response.json(savedTodo)
})


module.exports = todosRouter