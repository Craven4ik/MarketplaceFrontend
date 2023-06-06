import {useEffect, useState} from "react";
import CartOrder from "./CartOrder";
import {useNavigate} from "react-router-dom";


const Cart = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
        else {
            fetch("https://marketplace-backend-i22y.onrender.com/api/Order/GetOrdersWithFilter?UserID="
                +window.localStorage.getItem("UserID")+"&State=0", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setOrders(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div>
            <h1 className="main-page-name">Cart</h1>
            <div>
                {orders.length
                    ? orders.map(order => (
                        <CartOrder key={order.id} order={order} history={1}/>
                    ))
                    : <h1 className="main-page-name">There are no orders in progress</h1>
                }
            </div>
        </div>
    )
}

export default Cart