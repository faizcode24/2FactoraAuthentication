// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import bcrypt from "bcryptjs"
// import User from "../models/user.js";

// passport.use(
//     new LocalStrategy(async (username, password, done)=>{
//         try {
//             const user = await User.findOne({username});
//             if(!user) return done(null, false, {message:"User not found"});
//             const isMatch = await bcrypt.compare(password, user.password);
//             if(!isMatch) return done(null, false, {message:"Invalid password"});
//         } catch (error) {
//             return done(error);
//         }
//     })
// )

// passport.serializeUser((user, done) =>{
//     console.log("we are inside  serializer")
//     done(null, user._id);
// })

// passport.deserializeUser(async(_id, done) =>{
//     try {
//         console.log("we are inside  deserailizeUser");
//         const user = await User.findById(_id);
//         done(null, user);
        
//     } catch (error) {
//         done(error);
//     }
// })

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// LocalStrategy for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        // If the user is not found
        return done(null, false, { message: "User not found" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // If password does not match
        return done(null, false, { message: "Invalid password" });
      }
      
      // If authentication is successful
      return done(null, user);  // Don't forget to pass the user object
    } catch (error) {
      // Handle errors
      return done(error);
    }
  })
);

// Serialize user (store user id in session)
passport.serializeUser((user, done) => {
  console.log("We are inside serializer");
  done(null, user._id);
});

// Deserialize user (retrieve user by id from session)
passport.deserializeUser(async (_id, done) => {
  try {
    console.log("We are inside deserializeUser");
    const user = await User.findById(_id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
