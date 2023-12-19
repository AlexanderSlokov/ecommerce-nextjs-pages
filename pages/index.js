
import Layout from "@/components/Layout";
import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";
import React from 'react'; // This line is necessary for JSX to work

export default function Home() {
    //catch session
    return(
        <Layout>
            <HomeHeader/>
            <HomeStats/>
        </Layout>
    );

}
