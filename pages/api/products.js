import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const { method } = req;
 await mongooseConnect();
  if (method === "GET") {
    if (req.query.id) {
      const product = await Product.findById(req.query.id);
      res.json(product);
    }else{
      const products = await Product.find({});
      res.json(products);
    }
    
  }
 if (method === "POST") {
  const{ name, price, description} = req.body;
  const productDoc= await Product.create({
    name,
    price,
    description,
    // images: [image]
  })
    res.json(productDoc);
  }
}