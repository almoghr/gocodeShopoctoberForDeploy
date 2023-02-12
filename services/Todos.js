import {TodosModel} from '../models/Todos.js'

export const getAllTodos = () => {
    return TodosModel.find({}).populate({ path: 'user', select: '-password -__v' })
}

export const addTodo = (todoTitle, user) => {
    const newTodo = new TodosModel({title:todoTitle, user})
    return newTodo.save()
}

export const getOneTodo = (id) => {
    return TodosModel.findOne({_id: id})
}

export const deleteTodo = (id) => {
    return TodosModel.findOneAndDelete({_id: id})
}