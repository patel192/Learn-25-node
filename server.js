const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const mongoUri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("DB connected");

    app.listen(process.env.PORT || 3001, () => {
      console.log("Server started");
    });
  })
  .catch((err) => console.error(err));
