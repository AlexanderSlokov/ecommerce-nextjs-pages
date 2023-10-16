import Layout from "@/compoments/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Delete_On_Product_Page () {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    // Get id from URL
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(response =>
            setProductInfo(response.data))

    }, [id]);
    function goBack() {
        router.push('/products');
    }

    // Function that call the delete api to delete product bases on its id
    async function deleteProduct() {
        await axios.delete('api/products?id=' + id).then(response => {
            setProductInfo(response.data);
        })
        goBack()
    }

    return  (
        <Layout>
            <h1 className={"text-center"}>Do you really want to delete &apos;{productInfo?.name}&apos;?
            </h1>
            <div className={"flex gap-2 justify-center"}>
                <button
                    onClick={deleteProduct}
                    className={"btn-red"}> Yes </button>

                <button className={"btn-default"}
                        onClick={goBack}> No </button>
            </div>
        </Layout>

    );
}