"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Orders(){
    const [orders, setOrders]  = useState([])

    useEffect(() => {
        axios.get("/api/orders")
        .then(response => {
            setOrders(response.data)
        }).catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1>Orders</h1>

            <table className="basic">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
                                {order.name} {order.email} <br />
                                {order.city} {order.postalCode} {order.country} <br />
                                {order.streetAddress}
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}