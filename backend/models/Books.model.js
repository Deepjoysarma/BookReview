import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Books = new mongoose.model('Books', booksSchema);
export default Books;