import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdmin } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
 await mongooseConnect();
     await isAdmin(req, res);
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
  const{title, price, description, images, category} = req.body;
  const productDoc= await Product.create({
    title,
    price,
    description,
    images,
    category})
    res.json(productDoc);
  }
  if(method === "PUT"){
    const { _id, title, price, description, images, category} = req.body;
    const productDoc = await Product.findByIdAndUpdate(_id, {
      title,
      price,
      description,
      images,
      category

    });
    res.json(productDoc);
  }
  if(method === "DELETE"){
    const { id } = req.query;
    const productDoc = await Product.findByIdAndDelete(id);
    res.json(productDoc);
  }
}