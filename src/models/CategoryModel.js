const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required:true,
      trim:true // Name of the category
    },
    type: {
      type: String, // Whether it's for money coming in or going out
      enum: ["income", "expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({
  name:1,
  type:1
},
{
  unique:true
});


module.exports = mongoose.model("category", categorySchema);
