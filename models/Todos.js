import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    dateCreated:{
        type: Date,
        default: Date.now(),
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required:true,
    }
})

// model related to the specific schema
export const TodosModel = mongoose.model('Todos', TodoSchema);