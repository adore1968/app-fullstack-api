import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@merndb.rlaroi3.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(uri,  {
      useNewUrlParser: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
