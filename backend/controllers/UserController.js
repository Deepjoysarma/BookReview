import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.model.js";


const userRegister = async(req, res) => {
    try {

        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({success:false, message:"Please Enter All The Fields"})
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({success:false, message:"User Already Exist! Please Login"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            success:true,
            message:"User Registered Successfully",
            token
        });

    } catch (error) {
        console.log("userRegister Error");
        res.status(500).json({success:false, message:"Error in user register"});
    }
}

const userLogin = async(req, res) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({success:false, message:'All fields are required'});
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(409).json({success:false, message:'No account exist, Please register'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success:true,
            message:"Login Successfully",
            token
        });

    } catch (error) {
        console.log("Error in User Login");
        res.status(500).json({success:false, message:"Error in user login"});
    }
}

export {userRegister, userLogin};