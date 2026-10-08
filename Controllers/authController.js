import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Diagnostic Log
    console.log("Registration Attempt:", { name, email, password: password ? "***" : "missing" });

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields (Name, Email, Password)" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 2. Check for existence
    const userExist = await User.findOne({ email });

    if (userExist) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // 3. Create User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("User registered successfully:", user._id);
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error during registration" });
  }
};



// LOGIN
export const loginUser = async (req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json({message:"Invalid credentials"});
}

const match = await bcrypt.compare(password,user.password);

if(!match){
return res.status(400).json({message:"Invalid credentials"});
}

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({
message:"Login successful",
token,
user
});

}catch(error){
res.status(500).json({message:error.message});
}

};



// FORGOT PASSWORD
export const forgotPassword = async (req,res)=>{

try{

const {email} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(404).json({message:"User not found"});
}

const resetToken = crypto.randomBytes(32).toString("hex");

user.resetToken = resetToken;
user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

await user.save();

res.json({
message:"Reset token generated",
resetToken
});

}catch(error){
res.status(500).json({message:error.message});
}

};



// RESET PASSWORD
export const resetPassword = async (req,res)=>{

try{

const {token,password} = req.body;

const user = await User.findOne({
resetToken:token,
resetTokenExpire:{$gt:Date.now()}
});

if(!user){
return res.status(400).json({message:"Token invalid or expired"});
}

const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password,salt);

user.resetToken = undefined;
user.resetTokenExpire = undefined;

await user.save();

res.json({
message:"Password reset successful"
});

}catch(error){
res.status(500).json({message:error.message});
}

};