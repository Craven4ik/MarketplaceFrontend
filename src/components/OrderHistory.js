import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CartOrder from "./CartOrder";

const OrderHistory = () => {
    const [ordersFinished, setOrdersFinished] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
        else {
            fetch("https://marketplace-backend-i22y.onrender.com/api/Order/GetOrdersWithFilter?UserID="
                +window.localStorage.getItem("UserID")+"&State=1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setOrdersFinished(data)
                    console.log(ordersFinished)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        console.log(ordersFinished)
    }, [])

    return (
        <div>
            <h1 className="main-page-name">Order history</h1>
            <div>
                {ordersFinished.length
                    ? ordersFinished.map(order => (
                        <CartOrder key={order.id} order={order}/>
                    ))
                    : <h1 className="main-page-name">There are no finished orders</h1>
                }
            </div>
        </div>
    )
}

export default OrderHistory