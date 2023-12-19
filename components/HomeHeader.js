import {useSession} from "next-auth/react";
import React from 'react'; // Add this line to import React
export default function HomeHeader() {
    const {data:session} = useSession();
    return (
        <div className={"text-blue-700 flex justify-between"}>
            <h2 className={"mt-0"}>
                <div className={"flex gap-2 items-center"}>
                    <img src={session?.user?.image} alt="" className={"w-6 h-6 rounded-md sm:hidden"}/>
                    <div>
                        Bonjour, monsieur/mademoiselle <b>{session?.user?.name}</b>
                    </div>
                </div>
            </h2>

            <div className={"hidden sm:block"}>
                <div className={"bg-gray-300 flex gap-1 text-black rounded-lg overflow-hidden"}>
                    <img src={session?.user?.image} alt="" className={"w-6 h-6"}/>
                    <span className={"px-2 hidden"}>
                        {session?.user?.name}
                    </span>
                </div>

            </div>
        </div>
    )
}