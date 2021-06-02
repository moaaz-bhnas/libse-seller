// const { Int32 } = require("bson");
// const { Decimal128 } = require("bson");
// const { ObjectId } = require("bson");
// const mongoose = require("mongoose");

// const bilingualSchema = new mongoose.Schema({
//   en: { type: String, required: true },
//   ar: { type: String, required: true },
//   required: true,
// });

// const imageSchema = new mongoose.Schema({
//   url: {
//     type: String,
//     required: true,
//   },
//   order: {
//     type: Int32,
//     required: true,
//     unique: true,
//   },
// });

// const colorSchema = new mongoose.Schema({
//   default: Boolean,
//   name: bilingualSchema,
//   sizes: {
//     type: [String],
//     required: true,
//   },
//   images: {
//     children: [imageSchema],
//     required: true,
//   },
// });

// const detailSchema = new mongoose.Schema({
//   name: bilingualSchema,
//   value: bilingualSchema,
// });

// const materialSchema = new mongoose.Schema({
//   name: bilingualSchema,
//   proportion: {
//     type: Int32,
//     required: true,
//   },
// });

// const productSchema = new mongoose.Schema({
//   seller_id: {
//     type: ObjectId,
//     required: true,
//   },
//   name: bilingualSchema,
//   category: bilingualSchema,
//   clothing: bilingualSchema,
//   group: bilingualSchema,
//   details: {
//     children: [detailSchema],
//     required: true,
//   },
//   materials: {
//     children: [materialSchema],
//     required: true,
//   },
//   colors: {
//     children: [colorSchema],
//     required: true,
//   },
//   price: {
//     type: Decimal128,
//     required: true,
//   },
// });

// module.exports =
//   mongoose.models.Product || mongoose.model("Product", productSchema);
