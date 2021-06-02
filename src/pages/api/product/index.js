// import { connectToDatabase } from "../../../db";
// import Product from "../../../db/models/Product";

// connectToDatabase();

// export default async function productHandler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "POST":
//       try {
//         const product = await Product.create(req.body);
//         console.log("POST product: ", product);

//         res.status(201).json({ success: true, data: product });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//     default:
//       res.status(400).json({ success: false });
//   }
// }
