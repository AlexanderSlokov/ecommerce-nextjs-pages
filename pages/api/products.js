
import {Product} from "@/models/Products";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
   const {method} =req;
   await mongooseConnect();

   //treat with GET request, use async
   if (method === 'GET') {
      res.json( await Product.find());
   }

   if (method === 'POST') {
      const {name, destination, description, price, startDate, endDate, capacity } =req.body;

      //async-await function
      const productDoc = await Product.create({
         name, destination, description, price, startDate, endDate, capacity
      })
      res.json(productDoc);
   }
}