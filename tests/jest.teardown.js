const mongoose = require("mongoose");

module.exports = async () => {
  // Close any open mongoose connection
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.close(true);
    } catch (e) {
      // no-op
    }
  }
};
