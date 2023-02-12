import { getAllUsers, getOneUser, addUser, deleteUser } from '../services/User.js'
import { userAllowedUpdates } from '../data/data.js'

export const getAllUsersController = async(req, res) => {
    try{
        const allUsers = await getAllUsers()
    
        res.status(200).send(allUsers)

    } catch(e){
        console.log(e)
        res.status(500).send({message:e})
    }
}

export const addUserController =  async (req,res) => {
    try{
        const newUser = await addUser(req.body)
        res.status(200).send(newUser)
    } catch(e){
        console.log(e)
        res.status(500).send({message:e})
    }
}

export const deleteUserController = async (req,res) => {
    try{
        const { id } = req.params
        const deletedUser = await deleteUser(id)
        if(!deletedUser){
            res.status(404).send({message:"no such user with the specified id"})
        }
        res.status(200).send(deletedUser)

    } catch(e){
        console.log(e)
        res.status(500).send({message:e})
    }
}

export const updateUserController =  async (req,res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
    userAllowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
        res.status(400).send({message: "Invalid updates"})
    }
    
    try {
        const { id } = req.params
        const user = await getOneUser(id)
      if (!user) {
        res.status(404).send({message: "user does not exist"})
      }
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.status(200).send(user)
    } catch (e) {
        console.log(e)
        res.status(500).send({message:e})
    }

}