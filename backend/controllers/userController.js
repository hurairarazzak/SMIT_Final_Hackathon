import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const createToken = (id) => {
    const secretkey = process.env.JWT_SECRET || "abcdefgh123"
    return jwt.sign({ id }, secretkey)
}

// User Login Functionality

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, message: "User SignIn successfully", token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};

const signupUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({success: false, message: "User already exists" })
        }

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 5) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing User password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)

        res.json({ success: true, message: "User signUp successfully", token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, signupUser }