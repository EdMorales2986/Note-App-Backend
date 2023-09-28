import mongoose from "mongoose";

//SECTION - Mongoose
//ANCHOR - Config Mongoose
mongoose.connect(`${process.env.URI}`, { dbName: "PochiSQL" });
const connection = mongoose.connection;

//ANCHOR - Msg: Connection Stablished
connection.once("open", function () {
  console.log(`MongoDB Connection Stablished`);
});

//ANCHOR - Msg: Terminate on failed connection with MongoDB
connection.on("error", function (error) {
  console.log(error);
  process.exit(0);
});
//!SECTION
