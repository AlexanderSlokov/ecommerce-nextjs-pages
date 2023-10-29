import Layout from "@/compoments/Layout";
import {useState} from "react";
import axios from "axios";

export default function CategoriesPage() {
    const [name, setName] = useState('');

    async function saveCategory () {
       await axios.post('api/categories', {name});
       setName('');
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>New category Name:</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input className={'mb-0'}
                       type="text"
                       placeholder={'Category name'}
                       onChange={event => setName(event.target.value)}
                       value={name}/>
                <button type={"submit"} className={'btn-primary py-1'}>Save</button>
            </form>

        </Layout>
    )
}