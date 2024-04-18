//const mongoose = require('mongoose')
/*
const url = process.env.MONGODB_URI
*/
//const url = 'mongodb+srv://einohaikonen:ToDoHarjoitus@cluster0.io67a9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//mongoose.set('strictQuery', false)

/*console.log('connecting to', url)
mongoose.connect(url).then(() => {


  const todoSchema = new mongoose.Schema({
    task: String,
    check: Boolean,
  })

  const Todo = mongoose.model('Todo', todoSchema)
  Todo.find({}).then(result => {
    result.forEach(todo => {
      console.log(todo)
    })
    mongoose.connection.close()
  })
})
*/