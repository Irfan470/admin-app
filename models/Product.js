const { model, Schema, models } = require("mongoose");
const mongoose = require("mongoose");
// if (mongoose.models["Product"]) {
//   delete mongoose.models["Product"];
// }
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: 
    [{type: String}],


});
export const Product = models.Product || model("Product", ProductSchema);
