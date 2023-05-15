import OrderItem from "./OrderItem";
import {useEffect, useState} from "react";

const CartOrder = ({order}) => {
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        setOrderItems(order.orderItems)

    }, [])

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