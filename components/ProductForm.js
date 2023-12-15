import {useRouter} from "next/router";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";

const sanitizeInput = (input) => {
    console.log('Before sanitization:', input);
    const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, '');
    console.log('After sanitization:', sanitizedInput);
    return sanitizedInput;
};

const itineraryTemplate = `
--- Follow this template to fill in the information of a new tour.
--- If there are fields you don't have information, delete it.
--- Remember to delete this guideline section too.

# ITINERARY [You can add more days]

## Day 1: Arrival in [DESTINATION CITY] ([MEAL INCLUSIONS])
- Gathering Point: [GATHERING LOCATION], [SPECIFIC AREA DETAILS]
- Guide Assistance: [SPECIFIC ASSISTANCE PROVIDED]
- Transfer: [TRANSFER METHOD] to accommodation, check-in
- Evening Plans: [EVENING ACTIVITY DESCRIPTION] (expenses not included)
- Stay: Overnight in [DESTINATION CITY]

## Day 2: Exploring [DESTINATION CITY] ([MEAL INCLUSIONS])
- Morning Departure: [DEPARTURE METHOD] to [MORNING LOCATION]
- Daytime Activities: [ACTIVITIES DESCRIPTION] (expenses not included)
- Visits:
  * [VISIT LOCATION 1]
  * [VISIT LOCATION 2]
  * [VISIT LOCATION 3]
- Evening Entertainment: [EVENING ENTERTAINMENT DESCRIPTION]
- Stay: Overnight in [ACCOMMODATION LOCATION]

... and so on until the last section of the tour...

## Day [ the last day]: Departure from [DESTINATION CITY] to [NEXT DESTINATION OR RETURN CITY] ([MEAL INCLUSIONS])
- Morning: Checkout after breakfast
- Itinerary:
  * [ITINERARY STOP 1]
  * [ITINERARY STOP 2]
  * [ITINERARY STOP 3]
  * [ITINERARY STOP 4]
  * Shopping: [SHOPPING DETAILS DESCRIPTION]
- Transfer: [TRANSFER METHOD] to [DEPARTURE POINT]
- Tour Conclusion: [TOUR END LOCATION] or [NEXT DESTINATION DETAILS]

# ADDITIONAL NOTES
- Include any pertinent details that apply to all days or general information about the tour.

# TRANSPORTATION INFORMATION

## Arrival at [DESTINATION CITY]
- Date: [ARRIVAL DATE]
- Time: [ARRIVAL TIME]
- Mode: [MODE OF TRANSPORT] (e.g., Flight, Train, Bus, Ship)
- Details:
  * Service Number: [SERVICE NUMBER], [CARRIER NAME]
  * Departure Point: [DEPARTURE POINT], Terminal/Gate: [TERMINAL/GATE]
  * [OTHER PERTINENT DETAILS]

## Departure from [DESTINATION CITY]
- Date: [DEPARTURE DATE]
- Time: [DEPARTURE TIME]
- Mode: [MODE OF TRANSPORT] (e.g., Flight, Train, Bus, Ship)
- Details:
  * Service Number: [SERVICE NUMBER], [CARRIER NAME]
  * Departure Point: [DEPARTURE POINT], Terminal/Gate: [TERMINAL/GATE]
  * [OTHER PERTINENT DETAILS]
`;

export default function ProductForm({
                                        _id,
                                        title: existingTitle,
                                        destination: existingDestination,
                                        description: existingDescription,
                                        price: existingPrice,
                                        startDate: existingStartDate,
                                        endDate: existingEndDate,
                                        capacity: existingCapacity,
                                        images: existingImages,
                                        category: assignedCategory,
                                        properties: assignedProperties,
                                    })
{

    // Declare variables used
    const [title, setTitle] = useState(existingTitle || '');
    const [destination, setDestination] = useState(existingDestination || '');
    const [description, setDescription] = useState(existingDescription || itineraryTemplate);
    const [category, setCategory] = useState(assignedCategory || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [price, setPrice] = useState(existingPrice || '');
    const [startDate, setStartDate] = useState(existingStartDate ? formatDate(existingStartDate) : '');
    const [endDate, setEndDate] = useState(existingEndDate ? formatDate(existingEndDate) : '');
    const [capacity, setCapacity] = useState(existingCapacity || '');
    const [categories, setCategories] = useState([]);

    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUpLoading] = useState(false);

    const [categoriesLoading, setCategoriesLoading] = useState(false);

    // Router used to re-navigate back to the main categories
    const router = useRouter();
    const [goBackToProducts, setGobackToProduct] = useState(false);

    useEffect(() => {
        setCategoriesLoading(true);
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            setCategoriesLoading(false);
        })
    }, []);

    const handleTitleChange = (event) => {
        const title = event.target.value;
        setTitle(title);
    };

    const handleDestinationChange = (event) => {
        const sanitizedDestination = event.target.value;
        setDestination(sanitizedDestination);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        // Adjust the height to fit the content
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    // When the component loads, adjust the textarea height
    useEffect(() => {
        const textArea = document.getElementById('descriptionTextArea');
        if (textArea) {
            textArea.style.height = 'inherit';
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    }, []);

    const handleCapacityChange = (event) => {
        const sanitizedCapacity = sanitizeInput(event.target.value);
        setCapacity(sanitizedCapacity);
    };

// Format date to YYYY-MM-DD for input[type="date"]
    function formatDate(dateString) {
        const date = new Date(dateString);
        let day = ('0' + date.getDate()).slice(-2); // Format day to have two digits
        let month = ('0' + (date.getMonth() + 1)).slice(-2); // Format month to have two digits
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    async function saveProduct(event) {

        event.preventDefault();

        const properties = {};
        propertiesToFill.forEach(prop => {
            properties[prop.name] = productProperties[prop.name];
        });

        const data = {
            title,
            destination,
            description,
            price: Number(price),
            startDate,
            endDate,
            capacity: Number(capacity),
            images,
            category,
            properties,
        };

        if (_id) {
            // If we have id, update the product
            await axios.put('/api/products', {...data, _id});

        } else {
            // If not, create it
            await axios.post('/api/products', data);
            //after input a new product, return to the main products page
        }
        setGobackToProduct(true);
    }
    if (goBackToProducts) {
        router.push('/products');
    }

    //function for upload image
    async function uploadImages(ev) {
        const files = ev.target?.files;

        if (files?.length > 0 ) {
          setIsUpLoading(true);
          const data = new FormData();
          for (const file of files) {
              // files.forEach(file => data.append('file',file));
              data.append('file', file);
          }

          const respond = await axios.post('/api/upload', data);
          setImages(oldImages => {
              return [...oldImages,...respond.data.links];
          });
          setIsUpLoading(false);
        }
    }

    function uploadImagesOrder(images) {
        setImages(images);
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    const propertiesToFill = [];
    if (categories?.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category);
        if (catInfo) {
            propertiesToFill.push(...catInfo.properties);
            while(catInfo.parent?._id) {
                const parentCategory = categories.find(({_id}) => _id === catInfo.parent._id);
                if (parentCategory) {
                    propertiesToFill.push(...parentCategory.properties);
                    catInfo = parentCategory;  // Continue with the new parent category
                } else {
                    // If a parent category is not found, break out of the loop
                    console.error('Parent category not found');
                    break;
                }
            }
        } else {
            // catInfo is undefined, handle accordingly
            console.error('Category not found');
        }
    }

    return (
        <form onSubmit={saveProduct}>

            <label>Tour name: </label>
            <input
                type="text"
                placeholder={"Tour name"}
                value={title}
                onChange={handleTitleChange}
            />

            <label>Category:</label>
            <select value={category}
                    onChange={event  => setCategory(event.target.value)}
            >
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(c => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={c._id}>{c.name}</option>
                ))}
            </select>
            {categoriesLoading && (
                <Spinner fullWidth={true}/>
            )}
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                // eslint-disable-next-line react/jsx-key
                <div className={""}>
                    <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                    <div>
                        <select
                            value={productProperties[p.name]}
                            onChange={event =>
                                setProductProp(p.name, event.target.value)}>
                            {p.values.map(v => (
                                // eslint-disable-next-line react/jsx-key
                                <option value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            <label> Photos:</label>

            <div  className={"mb-2 flex flex-wrap gap-1"}>
                <ReactSortable
                    list={images}
                    className={'flex flex-wrap gap-1'}
                    setList={uploadImagesOrder}>
                    {/*Load our images from the aws link*/}
                    {!!images?.length && images.map(link => (
                        <div key={link} className={"h-72 bg-white p-4 shadow-md rounded-sm border border-gray-200"}>
                            <img src={link} alt="Loading" className={"rounded-lg"}/>
                        </div>
                    ))}
                </ReactSortable>

                {isUploading && (
                   <div className={'h-72 flex items-center'}>
                        <Spinner/>
                   </div>
                )}
                <label className={"w-72 h-72 cursor-pointer text-primary flex flex-col items-center justify-center gap-1 rounded-lg bg-white shadow-md border border-gray-400 "}>
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
            </div>

            <label>Destination: </label>
            <input
                type="text"
                placeholder={"Tour destination"}
                value={destination}
                onChange={handleDestinationChange}
            />

            <label>Description: </label>
            <textarea
                id="descriptionTextArea"
                placeholder={"Tour description"}
                value={description}
                onChange={handleDescriptionChange}
                // style={{ overflow: 'hidden' }}
            ></textarea>

            <label>Price (in USD):</label>
            <input
                type="number"
                placeholder={"Price"}
                value={price}
                onChange={event=> setPrice(event.target.value) }
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
                onChange={handleCapacityChange}
            />

            <button
                type={"submit"}
                className={"btn-primary"}>Save
            </button>
        </form>
    );
}