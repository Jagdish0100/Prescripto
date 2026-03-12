import mongoose from "mongoose";

const connectDB = async () => {
 
  await mongoose.connect(`${process.env.MONGODB_URI}`).then(() => console.log('Connected!')).catch(()=>console.log('IP issue!'));
};

export default connectDB;
