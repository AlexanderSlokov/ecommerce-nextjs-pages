import Layout from "@/compoments/Layout";
import {useState} from "react";
import axios from "axios";

export default function NewTour(){
    const [name,setName] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [capacity, setCapacity] = useState('');

    //function to create req, res packet product by apis
    //npm install axios
    async function createProduct(event) {
        event.preventDefault();
        const data = {name, destination, description, price, startDate, endDate, capacity};
        await axios.post('/api/products', data);
    }

    return(
        <Layout>
            <form onSubmit={createProduct}>

                <h1 >New Tour</h1>

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
                    className={"btn-primary"}>Save</button>
            </form>

        </Layout>
    );
}