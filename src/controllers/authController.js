import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { username, password } = req.body; // Use req.body to extract data from the request

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            password: hashedPassword,
            isMfaActive: false,
        });

        console.log("New User: ", newUser);

        // Save the new user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        // Send error response
        res.status(500).json({ error: "Error registering user", message: error.message });
    }
};

// Placeholder for other functions
export const login = async (req, res) => {
    console.log("The authenticated user is : ", req.user);
    res.status(200).json({
        message:"User logged in successfully",
        username: req.user.username,
        isMfaActive: req.user.isMfaActive,
    })
};
export const authStatus = async (req, res) => {
    if(req.user) {
        res.status(200).json({
            message:"User logged in successfully",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive,
        });
    }

    else {
        res.status(401).json({message:"Unauthorized user" });
    }
};
export const logout = async (req, res) => {
    if(!req.user)  res.status(401).json({message:"Unauthorized user" });
    req.logout((err)=>{
      if(err) return  res.status(400).json({message:" user not logout" });
      res.status(200).json({message:"User logged out successfully" });
    })
};


export const setup2FA = async (req, res) => {
    try {
        console.log("The req.user is", req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("The secret object is :", secret);
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url = speakeasy.otpauthURL({
         secret: secret.base32,
         label: `${req.user.username}`,
         issuer : "www.mdfaiz.com",
         encoding: "base32",  
        });
        const qrImageUrl = await qrCode.toDataURL(url);
        res.status(200).json({
            secret: secret.base32,
            qrCode: qrImageUrl,
        })
    } catch (error ) {
        res.status(500).json({error: "Error while setting up 2FA", message:error})
        
    }
};
export const verify2FA = async (req, res) => {
   const {token} = req.body;
   const user = req.user;
   
   const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
   });
   if(verified) {
    const jwtToken = jwt.sign(
        {username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1hr"}
    );
    res.status(200).json({message:"2FA Sucessful", token: jwtToken})
   }
   else{
    res.status(400).json({message:"Invalid 2FA token"})
   }
};
export const reset2FA = async (req, res) => {

    try {
        const user = req.user;
        user.twoFactorSecret="";
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({message: "2FA reset successfully"})
        
    } catch (error) {
        res.status(500).json({error: "Error while resetting 2FA", message:error})
        
    }
};
