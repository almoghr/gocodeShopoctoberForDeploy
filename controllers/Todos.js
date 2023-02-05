import { getAllTodos, getOneTodo, addTodo, deleteTodo } from "../services/Todos.js";
import { todosAllowedUpdates } from '../data/data.js'

export const getAllTodosController = async(req, res) => {
    try{
        const allTodos = await getAllTodos()
    
        res.status(200).send(allTodos)

    } catch(e){
        console.log(e)
        res.status(500).send({message:e})
    }
}

const obj = {title: "something@something.com"}

export const addTodoController =  async (req,res) => {
    try{
        const todoTitle = req.body.title
        const newTodo = await addTodo(todoTitle)
        res.status(200).send(newTodo)
    } catch(e){
        console.log(e)
        res.status(500).send({message:e})
    }
}

export const deleteTodoController = async (req,res) => {
    try{
        const { id } = req.params
        const deletedTodo = await deleteTodo(id)
        if(!deletedTodo){
            res.status(404).send({message:"no such todo with the specified id"})
        }
        res.status(200).send(deletedTodo)

    } catch(e){
        console.log(e)
        res.status(500).send({message:e})
    }
}

export const updateTodoController =  async (req,res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
    todosAllowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
        res.status(400).send({message: "Invalid updates"})
    }
    
    try {
        const { id } = req.params
        const todo = await getOneTodo(id)
      if (!todo) {
        res.status(404).send({message: "todo does not exist"})
      }
      updates.forEach((update) => (todo[update] = req.body[update]));
      await todo.save();
      res.status(200).send(todo)
    } catch (e) {
        console.log(e)
        res.status(500).send({message:e})
    }

}