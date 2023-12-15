import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {withSwal} from "react-sweetalert2";

function SettingPage({swal}) {
    const [products, setProducts] = useState([]);
    const [featuredProductId, setFeaturedProductId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [serviceFee, setServiceFee ] = useState('');

    async function saveSetting() {
        setIsLoading(true);
        await axios.put('/api/settings', {
            name: 'featuredProductId',
            value: featuredProductId,
        });

        // await axios.put('/api/settings', {
        //     name: 'serviceFee',
        //     value: serviceFee,
        // });
        setIsLoading(false);
        await  swal.fire({
            title:'Setting saved!',
            icon:'success'
        });

    }

    async function fetchAll() {
        await axios.get('api/products').then(r => {
            setProducts(r.data);
            setIsLoading(false);
        });

        await axios.get('/api/settings?name=featuredProductId').then(r => {
            setFeaturedProductId(r.data.value);

        });

        // await axios.get('/api/settings?name=serviceFee').then(r => {
        //     setServiceFee(r.data.value);
        // })
    }

    useEffect(() => {
        setIsLoading(true);
        fetchAll().then(() => {
            setIsLoading(false);
        });
    }, []);

    return(
        <Layout>
           <h1>Store Settings</h1>
            {isLoading && (
                <Spinner/>
            )}
            {!isLoading && (
                <>
                    <label >Current displaying featured product:</label>
                    <select
                        value={featuredProductId}
                        onChange={ev => setFeaturedProductId(
                            ev.target.value
                        )}
                    >
                        {products.length > 0 && products.map(product => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={product._id}>{product.title}</option>
                        ))}
                    </select>
                    {/*<label>Service Price (percentage)</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    value={serviceFee}*/}
                    {/*    onChange={ev =>*/}
                    {/*        setServiceFee(ev.target.value)}/>*/}
                    <div>
                        <button
                            onClick={saveSetting}
                            className={'btn-primary'}>Save settings</button>
                    </div>
                </>
            )}
        </Layout>
    )
}

export default withSwal(({swal}) => (
    <SettingPage swal={swal}/>
));