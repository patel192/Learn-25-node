const mongoose = require("mongoose");
require("dotenv").config();
// Kicking off the cron job for recurring expenses
require("./src/utiles/recurringCron");

// Bringing in the configured express app
const app = require("./app");

// Decide which database to talk to based on the environment
const mongoUri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

// Fire up the database connection and then start the engine
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("🚀 Database connected successfully!");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });

