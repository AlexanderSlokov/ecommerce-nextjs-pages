
import Layout from "@/compoments/Layout";
import {useSession} from "next-auth/react";

export default function Home() {
    //catch session
    const {data:session} = useSession();

    return <Layout>
        <div className={"text-blue-700 flex justify-between"}>

            <h2>
                Bonjour, monsieur/mademoiselle <b>{session?.user?.name}</b>
            </h2>

            <div className={"flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden"}>
                <img src={session?.user?.image} alt="" className={"w-6 h-6"}/>
                <span className={" px-2"}>
                    {session?.user?.name}
                </span>

            </div>
        </div>
    </Layout>
}
