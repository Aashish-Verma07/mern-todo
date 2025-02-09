import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validations
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "User Already Exists.",
        status: 409,
      });
    }

    // hashing the password
    const hashedPassword = await hashPassword(password);

    // saving the user
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
         message: "email is required"
         });
    }
    if(!password){
        return res.status(400).send({
            message:"password is required"
        })
    }

    // check user
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message: "User is not registered",
            errors,
            });
    }
     
    // comapring or matching the password
    const ismatch  = await comparePassword(password, user.password);
    if(!ismatch){
        return res.status(401).send({
            success: false,
            message: "Invalid email or password",
        });
    }
 
    // creating TOKEN
    const token = JWT.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "7d"});
    
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user:{
        id: user._id,
        name: user.username,
        email:user.email,
        password: user.password
      },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while logging in",
      error,
    });
  }
};
