//imports
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { getAllTodosController, addTodoController, updateTodoController, deleteTodoController } from './controllers/Todos.js';
import { addUserController, deleteUserController, getAllUsersController, updateUserController } from './controllers/User.js';
dotenv.config();

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env

//the initialising of the server itself
const app = express()

// middlewares for the server
app.use(express.json())
app.use(cors())
app.use(express.static('client/build'))

mongoose.set('strictQuery', true)

//routes for todos
app.get('/api/getAllTodos', getAllTodosController)
app.post('/api/todos/addTodo', addTodoController)
app.put('/api/todos/updateTodo/:id', updateTodoController)
app.delete('/api/todos/deleteTodo/:id', deleteTodoController)

//routes for users 

app.get('/api/getAllusers', getAllUsersController)
app.post('/api/users/addUser', addUserController)
app.put('/api/users/updateUser/:id', updateUserController)
app.delete('/api/users/deleteUser/:id', deleteUserController)

//index.html route
app.get("*", (req,res) => {
    res.sendFile(__dirname+"/client/build/index.html")
})

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (info) => {
    app.listen(PORT,() => {
        console.log("info", info)
        console.log('i am listening')
    })    
  })