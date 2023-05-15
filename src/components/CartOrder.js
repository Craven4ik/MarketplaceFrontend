import ProductItem from "./ProductItem";
import OrderItem from "./OrderItem";
import {useState} from "react";

const CartOrder = ({order}) => {
    const [orderItems, setOrderItems] = useState([])

    return (
        <div key={order.id}>
            {order.orderItems.length
                ? orderItems.map(orderItem => (
                    <OrderItem key={orderItem.id} orderItem={orderItem}/>
                )) : <></>

            }
        </div>
    )
}

export default CartOrder