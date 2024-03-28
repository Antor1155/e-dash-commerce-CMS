"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get("/api/orders")
            .then(response => {
                setOrders(response.data)
                setLoading(false)
            }).catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1>Orders</h1>

            {loading ? <Loading /> :
                <table className="basic">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Paid</th>
                            <th>Recipient</th>
                            <th>Products</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length > 0 && orders.map(order => (
                            <tr key={order._id}>
                                <td>{(new Date(order?.createdAt)).toLocaleString()}</td>
                                <td className={order.paid ? "text-green-600" : "text-red"}>
                                    {order.paid ? "YES" : "NO"}
                                </td>
                                <td>
                                    {order.name} {order.email} <br />
                                    {order.city} {order.postalCode} {order.country} <br />
                                    {order.streetAddress}
                                </td>

                                <td>
                                    {order.line_items.map(l => (
                                        <>
                                            {l.price_data?.product_data?.name} x {l.quantity}
                                            <br />

                                        </>
                                    ))}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            }
        </div>
    )
}