import {Category} from "@/models/Category";
import mongoose from "mongoose";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Products";

export default async function handle(req, res) {

    const {method} = req;
    // Use mongoose to connect to MongoDB for GET request
    await mongooseConnect();

    if (method ==='GET') {
        res.json(await Category.find().populate('parent'));
    }

    if (method === 'POST') {

        const {name, parentCategory} = req.body;

        const categoryDoc = await Category.create({
            name,
            parent:parentCategory,
        });

        res.send(categoryDoc);
    }

    if (method === 'PUT') {

        const {name, parentCategory, _id} = req.body;

        const categoryDoc = await Category.updateOne({_id}, {
            name,
            parent:parentCategory,
        });

        res.send(categoryDoc);
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('ok');
    }
}