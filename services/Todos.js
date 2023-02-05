import {TodosModel} from '../models/Todos.js'

export const getAllTodos = () => {
    return TodosModel.find({})
}

export const addTodo = (todoTitle) => {
    const newTodo = new TodosModel({title:todoTitle})
    return newTodo.save()
}

export const getOneTodo = (id) => {
    return TodosModel.findOne({_id: id})
}

export const deleteTodo = (id) => {
    return TodosModel.findOneAndDelete({_id: id})
}