import {Category} from "@/models/Category";
import mongoose from "mongoose";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {

    const {method} = req;
    // Use mongoose to connect to MongoDB for GET request
    await mongooseConnect();

    if (method ==='GET') {
        res.json(await Category.find());
    }

    if (method === 'POST') {
        const {name} = req.body;
        const categoryDoc = await Category.create({
            name
        });
        res.send(categoryDoc);
    }
}