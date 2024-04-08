const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
/*
const url = process.env.MONGODB_URI
*/
const url = 'mongodb+srv://einohaikonen:ToDoHarjoitus@cluster0.io67a9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const todoSchema = new mongoose.Schema({
  task: String,
  id: Number,
  check: Boolean
})

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('ToDo', todoSchema)