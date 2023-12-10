
import Layout from "@/components/Layout";
import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";

export default function Home() {
    //catch session
    return(
        <Layout>
            <HomeHeader/>
            <HomeStats/>
        </Layout>
    );

}
