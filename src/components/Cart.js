import {useState} from "react";
import ProductItem from "./ProductItem";
import CartOrder from "./CartOrder";
import {useNavigate} from "react-router-dom";


const Cart = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="main-page-name">Cart</h1>
            <div>
                {orders.length ?
                    orders.map(order => (
                        <CartOrder key={order.id} order={order}/>
                    ))
                    : <p>There are no orders</p>
                }
            </div>
        </div>
    )
}

export default Cart