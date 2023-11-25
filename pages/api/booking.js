
import {mongooseConnect} from "@/lib/mongoose";
import {Booking} from "@/models/Booking";

export default async function handler(req, res) {
    await mongooseConnect();
    res.json( await Booking.find().sort({createdAt:-1}));
}