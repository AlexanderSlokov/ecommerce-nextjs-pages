import Nav from "@/components/nav";
import { useSession, signIn,} from "next-auth/react";
import {useState} from "react";
import Logo from "@/components/Logo";
import React from 'react'; // Add this line to import React
import SpinnerWithBackground from "@/components/SpinnerWithBackground";

export default function Layout({children}) {
    const {data: session } = useSession();
    const [showNav, setShowNav] = useState(false);

    // State for managing spinner visibility
    const [loading, setLoading] = useState(false);

    // Modified login function
    const handleLogin = () => {
        setLoading(true); // Show spinner
        signIn('google').finally(() => setLoading(false)); // Hide spinner after login attempt
    };

    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    {/* Show spinner when loading is true */}
                    {loading ? <SpinnerWithBackground/> :
                        <button onClick={handleLogin} className="bg-white p-2 px-4 items-center rounded-md">
                            Login with Google
                        </button>
                    }
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

                <div className={"flex grow justify-center mr-6"}>
                    <Logo/>
                </div>

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