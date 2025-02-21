import  User  from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {

        const users = await User.find();        
        res.status(201).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { email,name, password} = req.body;
console.log(email,name,password)
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ email,name, password:hashedPassword });
        console.log(newUser)
        await newUser.save();
        
        res.status(201).json({newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {  // ✅ Ensure this function exists
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        console.log(user);
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful",user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
