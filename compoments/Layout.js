import Nav from "@/compoments/nav";
import { useSession, signIn, signOut } from "next-auth/react";
import {useState} from "react";

export default function Layout({children}) {
    const {data: session } = useSession();

    const [showNav, setShowNav] = useState(false);

    if (!session)  {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 items-center rounded-md">Login with Google</button>
                </div>
            </div>
        );
    }
    return (
        <div className={"text-white bg-bgGray min-h-screen"}>
            <div className="md:hidden flex items-center p-4">
                <button onClick={() => setShowNav(true) }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                    </svg>
                </button>
            </div>


            <div className="text-black flex">
                <Nav show={showNav}/>
                <div className={"bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4"}>
                    {children}
                </div>
            </div>
        </div>
    );

}