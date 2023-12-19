import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {withSwal} from "react-sweetalert2";
import Spinner from "@/components/Spinner";
import {prettyDate} from "@/lib/date";
import React from 'react'; // Add this line to import React
function AdminPage({swal}) {
    const [email, setEmail] = useState('');
    const [adminEmails, setAdminEmails] = useState([]);
    const [isLoading, setIsLoading]=useState(false);
    function addAdmin(ev) {
        ev.preventDefault();
        axios.post('/api/admins', {email}).then(r => {
            console.log(r.data);
            swal.fire({
                title: 'Admin created!',
                icon: 'success',
            }).then(r  =>{});
            setEmail('');
            loadAdmins();
        }).catch(er => {
            swal.fire({
                title: 'Error!',
                text:er.response.data.message,
                icon: 'error',
            }).then(r  =>{});
        });
    }

    function loadAdmins() {
        setIsLoading(true);
        axios.get('/api/admins').then(r => {
            setAdminEmails(r.data);
            setIsLoading(false);
        })
    }

    function deleteAdmin(_id, email) {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete admin${email}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                axios.delete('/api/admins?_id='+_id).then(() => {
                    swal.fire({
                        title: 'Admin deleted!',
                        icon: 'success',
                    }).then(r  =>{});
                    loadAdmins();
                })}
        });
    }

    useEffect(() => {
        loadAdmins();
    }, []);

    return(
        <Layout>
            <h1>Admins</h1>
            <h2>Add a new administrator gmail: </h2>

            <form onSubmit={addAdmin}>
                <div className={"flex gap-2"}>

                    <input type="text"
                           className={"mb-0"}
                           placeholder={"google email"}
                           value={email}
                           onChange={ ev => setEmail(ev.target.value)}
                    />

                    <button
                        type={"submit"}
                        className={"btn-primary py-1 whitespace-nowrap"}>Add this email</button>
                </div>
            </form>

            <table className={"basic"}>
                <thead>
                <tr>
                    <th className={"text-left"}>List of Gmail stored</th>
                    <th>Created at</th>
                    <th></th>
                </tr>
                </thead>
                {isLoading && (
                    <tr>
                        <td colSpan={2}>
                            <div className={"py-4"}>
                                <Spinner fullWidth={true}/>
                            </div>
                        </td>
                    </tr>
                )}
                <tbody>
                {adminEmails.length > 0 && adminEmails.map(adminEmail => (
                    <tr key={adminEmail._id}>
                        <td>
                            {adminEmail.email}
                        </td>
                        <td>
                            {adminEmail.createdAt && prettyDate(adminEmail.createdAt)}
                        </td>

                        <td>
                            <button
                                onClick={() => deleteAdmin(adminEmail._id, adminEmail.email)}
                                className="btn-red">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default withSwal(({swal}) => (
    <AdminPage swal={swal}/>
));