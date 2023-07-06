const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    orders:[{
      image:{type:String},
      title: { type: String },
      author: { type: String },
      isbn: { type: String },
      price: { type: Number },
      catagory:{type: String},
      status:{type: String},
      quantity: { type: mongoose.Schema.Types.Mixed },

    },],  
    name:{type: String},
    userId:{type: String},
    phone:{type: Number},
    address:{type:String},
    email: { type: String },
    location: { type: String },
    pickupDate:{type:String},
    pickupTime:{type:String},
    totalPrice: { type: Number },

  },
  { collection: "orders" }
);
module.exports = mongoose.model("Orders", ordersSchema);