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
                                        images: existingImages,
                                    })
{

    // Declare variables used
    const [name, setName] = useState(existingName || '');
    const [destination, setDestination] = useState(existingDestination || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [startDate, setStartDate] = useState(existingStartDate || '');
    const [endDate, setEndDate] = useState(existingEndDate || '');
    const [capacity, setCapacity] = useState(existingCapacity || '');

    const [images, setImages] = useState(existingImages || []);

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
            capacity,
            images,
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

    //function for upload image
    async function uploadImages(event) {
        const files = event.target?.files;
        if (files?.length > 0 ) {
          const data = new FormData();
          for (const file of files) {
              // files.forEach(file => data.append('file',file));
              data.append('file', file);
          }

          const respond = await axios.post('/api/upload', data);
          setImages(oldImages => {
              return [...oldImages,...respond.data.links];
          } )
        }
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

            <label> Photos:</label>
            <div  className={"mb-2 flex flex-wrap gap-2"}>

                {/*Load our images from aws link*/}
                {!!images?.length && images.map(link => (
                    <div key={link} className={"h-72"}>
                        <img src={link} alt="" className={"rounded-lg"}/>
                    </div>
                ))}

                <label className={"w-72 h-72 cursor-pointer flex flex-col items-center justify-center gap-1 rounded-lg bg-gray-200"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>

                    <div>
                        Upload something
                    </div>

                    <input type="file"
                           onChange={uploadImages}
                           className={"hidden"}/>

                </label>
                {!images?.length && (
                    <div>No photos for this tour.</div>
                )}
            </div>

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