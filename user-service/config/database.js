let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      "mongodb+srv://devcuongtt:16062002@prod-db.9xfrb6c.mongodb.net/?retryWrites=true&w=majority&appName=prod-db"
    );
    console.log("Connect database user successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
