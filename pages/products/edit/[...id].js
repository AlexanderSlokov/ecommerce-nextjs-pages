import Layout from "@/compoments/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/compoments/ProductForm";

export default function EditBtnProductPage() {

    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id}  = router.query;

    useEffect(() => {

        if(!id) {
            return;
        }

        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data);
        });

    }, [id]);
    return (
        <Layout>
            <h1>Edit product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    )
}