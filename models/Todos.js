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
    }
})

// model related to the specific schema
export const TodosModel = mongoose.model('Todos', TodoSchema);