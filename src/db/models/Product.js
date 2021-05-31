const { Int32 } = require("bson");
const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const bilingualSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true },
  required: true,
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  order: {
    type: Int32,
    required: true,
    unique: true,
  },
});

const colorSchema = new mongoose.Schema({
  default: Boolean,
  name: bilingualSchema,
  sizes: {
    type: [String],
    required: true,
  },
  images: {
    type: [imageSchema],
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  seller_id: {
    type: ObjectId,
    required: true,
  },
  name: bilingualSchema,
  category: bilingualSchema,
  clothing: bilingualSchema,
  group: bilingualSchema,
  colors: {
    type: [colorSchema],
    required: true,
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
