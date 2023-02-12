import {UserModel} from '../models/User.js'

export const getAllUsers = () => {
    return UserModel.find({})
}

export const addUser = (userObj) => {
    const newUser = new UserModel({...userObj})
    return newUser.save()
}

export const getOneUser = (id) => {
    return UserModel.findOne({_id: id})
}

export const deleteUser = (id) => {
    return UserModel.findOneAndDelete({_id: id})
}