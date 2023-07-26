import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
