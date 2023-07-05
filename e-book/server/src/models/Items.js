const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    image:{type:String},
    title: { type: String },
    author: { type: String },
    isbn: { type: String },
    price: { type: Number },
    description:{type: String},
    catagory:{type: String},
    status:{type: String},
  },
  { collection: "items" }
);
module.exports = mongoose.model("Items", itemSchema);