const set = require("mongoose");
const connect = require("mongoose");

const mongoURI = "mongodb://localhost:27017";

const ConnectToMongo = () => {
  set("strictQuery", true);
  connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Connected to Mongo Successfully");
    }
  );
};

export default ConnectToMongo;
