// import { connect } from "mongoose";
import mongoose from "mongoose";



const dbConnect = async () => {
    try {
      
       await mongoose.connect(process.env.MONGODB_URI)
      
        console.log("Connected to MongoDB")
    }
    catch (error){
        console.log(`Database connection failed ${error.message}`);
       
    }
    
}

export default dbConnect;  





