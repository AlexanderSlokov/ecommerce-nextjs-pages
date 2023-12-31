import {Product} from "@/models/Products";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res);

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
            title,
            destination,
            description,
            price,
            startDate,
            endDate,
            capacity,
            images,
            category,
            properties,
            status,
        } = req.body;

        //async-await function
        const productDoc = await Product.create({
            title, destination, description, price,
            startDate, endDate, capacity, images, category,properties,status
        })
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const {
            title,
            destination,
            description,
            price,
            startDate,
            endDate,
            capacity,
            images,
            category,
            properties,
            _id,
            status,
        } = req.body;

        // console.log(images);

        await Product.updateOne({_id}, {
            title,
            destination,
            description,
            price,
            startDate,
            endDate,
            capacity,
            images,
            category,
            properties,
            status,
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