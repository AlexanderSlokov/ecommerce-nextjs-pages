import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {subHours} from "date-fns";
import React from 'react'; // Add this line to import React


export default function HomeStats() {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/booking').then(r => {
            setOrders(r.data);
            setIsLoading(false);
        });
    }, []);

    function ordersTotal(orders) {
        let sum = 0;
        orders.forEach(order => {
            const {line_items} = order;
            line_items.forEach(li=> {
                const lineSum = li.quantity * li.price_data.unit_amount / 100;
                sum += lineSum;
            })
        });
        return new Intl.NumberFormat('sv-SE').format(sum);
    }

    if(isLoading) {
        return (
            <div className={"my-4"}>
                <Spinner fullWidth={true}/>
            </div>
        );
    }

    const ordersToday = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24));
    const ordersWeek = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24*7));
    const ordersMonth = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24*30));

    return(
        <div className={""}>
            <h2>Booking:</h2>
            <div className="tile-grids">
                <div className={"tile"}>
                    <h3 className={"tile-header"}>Today</h3>
                    <div className={"tile-number"}>{ordersToday.length}</div>
                    <div className={"tile-desc"}>{ordersToday.length} orders today</div>
                </div>
                <div className={"tile"}>
                    <h3 className={"tile-header"}>This week</h3>
                    <div className={"tile-number"}>{ordersWeek.length}</div>
                    <div className={"tile-desc"}>{ordersWeek.length} orders this week</div>
                </div>
                <div className={"tile"}>
                    <h3 className={"tile-header"}>This month</h3>
                    <div className={"tile-number"}>{ordersMonth.length}</div>
                    <div className={"tile-desc"}>{ordersMonth.length} orders this month</div>
                </div>
            </div>
            <h2>Revenue:</h2>
            <div className="tile-grids">
                <div className={"tile"}>
                    <h3 className={"tile-header"}>Today</h3>
                    <div className={"tile-number"}>${ordersTotal(ordersToday)}</div>
                    <div className={"tile-desc"}>{ordersToday.length} orders today</div>
                </div>
                <div className={"tile"}>
                    <h3 className={"tile-header"}>This week</h3>
                    <div className={"tile-number"}>${ordersTotal(ordersWeek)}</div>
                    <div className={"tile-desc"}>{ordersWeek.length} orders this week</div>
                </div>
                <div className={"tile"}>
                    <h3 className={"tile-header"}>This month</h3>
                    <div className={"tile-number"}>${ordersTotal(ordersMonth)}</div>
                    <div className={"tile-desc"}>{ordersMonth.length} orders this month</div>
                </div>
            </div>
        </div>
    );
}