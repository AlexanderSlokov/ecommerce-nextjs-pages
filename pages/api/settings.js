import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {Setting} from "@/models/Setting";

export default async function handle(req,res) {
    await mongooseConnect();
    await isAdminRequest(req, res);

    if(req.method === 'PUT') {
        const {name, value} = req.body;
        const settingDoc = await Setting.findOne({name});

        // If we have setting documents, take it out, otherwise, create it.
        if(settingDoc) {
            settingDoc.value = value;
            await settingDoc.save();
            res.json(settingDoc);
        } else {
            res.json( Setting.create({name, value}));
        }
    }

    if (req.method === 'GET') {
        const{name} = req.query;
        res.json(await Setting.findOne({name}));
    }
}