import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";


export default function ProductForm({
                                        _id,
                                        name: existingName,
                                        destination: existingDestination,
                                        description: existingDescription,
                                        price: existingPrice,
                                        startDate: existingStartDate,
                                        endDate: existingEndDate,
                                        capacity: existingCapacity,
                                    }) {

    // Declare variables used
    const [name, setName] = useState(existingName || '');
    const [destination, setDestination] = useState(existingDestination || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [startDate, setStartDate] = useState(existingStartDate || '');
    const [endDate, setEndDate] = useState(existingEndDate || '');
    const [capacity, setCapacity] = useState(existingCapacity || '');

    // Router used to re-navigate back to main categories
    const router = useRouter();
    const [goBackToProducts, setGobackToProduct] = useState(false);

    //function to create request, response packets with MongoDB by apis
    //npm install axios
    async function saveProduct(event) {

        event.preventDefault();
        const data = {
            name,
            destination,
            description,
            price,
            startDate,
            endDate,
            capacity
        };

        if (_id) {
            // If we have id, update the product
            await axios.put('/api/products', {...data, _id});

        } else {

            // If not, create it
            await axios.post('/api/products', data);
            //after input a new product, return to main products page
        }
        setGobackToProduct(true);
    }

    if (goBackToProducts) {
        router.push('/products');
    }

    return (
        <form onSubmit={saveProduct}>

            <label>Tour name: </label>
            <input
                type="text"
                placeholder={"Tour name"}
                value={name}
                onChange={event => setName(event.target.value)}
            />

            <label>Destination: </label>
            <input
                type="text"
                placeholder={"Tour destination"}
                value={destination}
                onChange={event => setDestination(event.target.value)}
            />

            <label>Description: </label>
            <textarea
                placeholder={"Tour description"}
                value={description}
                onChange={event => setDescription(event.target.value)}
            ></textarea>

            <label>Price (in VND):</label>
            <input
                type="number"
                placeholder={"Price"}
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <label>Start Date:</label>
            <input
                type="date"
                placeholder={"Start date"}
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
            />


            <label>End Date:</label>
            <input
                type="date"
                placeholder={"End date"}
                value={endDate}
                onChange={event => setEndDate(event.target.value)}
            />

            <label>Capacity:</label>
            <input
                type="number"
                placeholder={"Capacity"}
                value={capacity}
                onChange={event => setCapacity(event.target.value)}
            />

            <button
                type={"submit"}
                className={"btn-primary"}>Save
            </button>
        </form>
    );
}