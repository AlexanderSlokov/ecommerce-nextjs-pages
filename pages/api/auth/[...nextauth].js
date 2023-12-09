import {MongoDBAdapter} from "@auth/mongodb-adapter";

require('dotenv').config();

import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "@/lib/mongodb";
import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";

await mongooseConnect();
// Function to check if an email trying to log in is an admin
function isAdminEmail(email) {
    // Return the promise for asynchronous handling
    return Admin.findOne({ email }).then(admin => !!admin);
}

// Function to check if an email trying to log in is an admin
// async function isAdminEmail(email) {
//     try {
//         const client = await clientPromise; // Ensure the client is connected
//         const db = client.db(); // Get the database instance
//
//         // Adjust this line to use the db instance for querying
//         const admin = await db.collection("admins").findOne({ email });
//         return !!admin;
//     } catch (error) {
//         console.error("Error in isAdminEmail:", error);
//         return false;
//     }

export const authOptions = {

    DefaultAdapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: async ({ session }) => {
            // Await the promise here
            if (session?.user?.email && await isAdminEmail(session.user.email)) {
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

// export async function isAdminRequest(req,res) {
//     const session = await getServerSession(req,res,authOptions);
//     if (!(await isAdminEmail(session?.user?.email))) {
//         res.status(401);
//         res.end();
//         throw 'not an admin';
//     }
// }

export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email || !(await isAdminEmail(session.user.email))) {
        res.status(401).end();
        throw 'Not an admin';
    }
}