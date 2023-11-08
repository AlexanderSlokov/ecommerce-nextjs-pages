import {Product} from "@/models/Products";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {

        // If the request has an id query of the product, response with find one
        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}));
        } else {
            // If the path does not have id? Just load the list of tours
            res.json(await Product.find());
        }
    }

    if (method === 'POST') {
        const {
            name, destination, description,
            price, startDate, endDate, capacity, images, category,
        } = req.body;

        //async-await function
        const productDoc = await Product.create({
            name, destination, description, price,
            startDate, endDate, capacity, images, category,
        })
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const {
            name, destination, description,
            price, startDate, endDate, capacity, images, category, _id
        } = req.body;

        // console.log(images);

        await Product.updateOne({_id}, {
            name,
            destination,
            description,
            price,
            startDate,
            endDate,
            capacity,
            images,
            category,
        });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}