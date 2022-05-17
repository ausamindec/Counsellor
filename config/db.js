const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Successfully Connected to DB"))
    .catch((error) => {
      console.log("Failed to connect to DB");
      console.log(error);
      process.exit(1);
    });
};

module.exports = dbConnect;
