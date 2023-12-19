import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import React from 'react'; // Add this line to import React
function formatDateTime(dateString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return  new Date(dateString).toLocaleTimeString('en-GB', options);
}

export default function BookingPage() {
    const [ isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/booking').then(response => {
            setBookings(response.data);
            setIsLoading(false);
        });
    }, []);


    return (
        <Layout>
            <h1>Orders</h1>
            <table className={"basic"}>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Paid?</th>
                    <th>Recipient</th>
                    <th>Products</th>
                </tr>
                </thead>

                <tbody>
                {isLoading && (
                        <tr>
                            <td colSpan={4}>
                                <div className={"py-4"}>
                                    <Spinner fullWidth={true}/>
                                </div>
                            </td>
                        </tr>

                )}
                {bookings.length > 0 && bookings.map(booking => (
                    <tr key={""}>
                        <td>{formatDateTime(booking.createdAt)}</td>
                        <td className={booking.paid ?
                        'text-green-600' : 'text-red-600'}>
                            {booking.paid? 'YES!': 'NO!'}
                        </td>
                        <td>
                            {booking.name} <br/>
                            {booking.gender} <br/>
                            {booking.email} <br/>
                            {booking.phoneNumber} <br/>
                            {booking.pickUpAddress}
                        </td>

                        <td>
                            {booking.line_items.map(line => (
                                <>
                                    {line.price_data?.product_data.name} <br/>
                                    {line.quantity} participants <br/>
                                    ------------------------------------ <br/>
                                </>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}