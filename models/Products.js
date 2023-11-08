import mongoose, {model, Schema, models} from "mongoose";


const ProductSchema = new Schema({
    name: {type:String, required:true},
    destination: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    startDate: {type:Date, required: true},
    endDate: {type:Date, required: true},
    capacity: {type:Number, required: true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
})

export const Product= models.Product || model('Product', ProductSchema);