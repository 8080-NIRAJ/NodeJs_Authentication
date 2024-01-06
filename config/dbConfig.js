// Import the mongoose library
import mongoose from 'mongoose';

const password = 'Niraj8999';

// Create the MongoDB connection URL with the encoded password

//const dbURI = `mongodb+srv://manianil8423:${password}@cluster0.p4pyoxg.mongodb.net/?retryWrites=true&w=majority`;
const dbURI = `mongodb+srv://Niraj80:${password}@cluster0.mzowurg.mongodb.net/`;
// Connect to the MongoDB server with the provided URL and options (none specified in this case)



export const connectUsingMongoose =async()=>{
    try{
      mongoose.connect(dbURI, {
        // Options can be added here if needed
        tls: true,
        tlsAllowInvalidCertificates: true,
      });
      console.log("Mongodb connected successfully!!!")
    }catch(err){
       console.log(err);
    }
}