import Layout from "@/compoments/Layout";

export default function NewTour(){
    return(
        <Layout>
            <h1 >New Tour</h1>
            <label>Tour name: </label>
            <input type="text" placeholder={"Tour name"}/>
            <label>Description: </label>
            <textarea placeholder={"Tour description"}></textarea>
        </Layout>
    );
}