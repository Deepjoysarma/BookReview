import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Admin = new mongoose.model('Admin', adminSchema);
export default Admin;