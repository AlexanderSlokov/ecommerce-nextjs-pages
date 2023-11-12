import {MongoDBAdapter} from "@auth/mongodb-adapter";

require('dotenv').config();

import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "@/lib/mongodb";

const adminEmails = ['thanhzeus2016@gmail.com'];

export const authOptions = {
    DefaultAdapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({session,token,user})  => {
            if (adminEmails.includes(session?.user?.email)) {
                return session;
            } else {
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
};

export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
    const session = await getServerSession(req,res,authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
        res.status(401);
        res.end();
        throw 'not an admin';
    }
}