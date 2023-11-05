import Layout from "@/compoments/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export default function CategoriesPage() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    //fetch categories list when load page
    function fetchCategories () {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    async function saveCategory (event) {
       event.preventDefault();
       await axios.post('api/categories', {name});
       setName('');
       fetchCategories();
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

            <table className={"basic mt-4"}>
                <thead>
                <tr>
                    <td>Category Name</td>
                </tr>
                </thead>

                <tbody>
                {categories.length > 0 && categories.map
                (category => (
                    <tr>
                        <td>{category.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </Layout>
    )
}