import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
export const Category =
  mongoose.models?.Category || mongoose.model("Category", CategorySchema);
