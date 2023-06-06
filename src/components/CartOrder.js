import OrderItem from "./OrderItem";
import {useEffect, useState} from "react";

const CartOrder = ({order, history}) => {
    const [orderItems, setOrderItems] = useState([])
    const [price, setPrice] = useState()

    useEffect(() => {
        setOrderItems(order.orderItems)
        fetch(`https://marketplace-backend-i22y.onrender.com/api/OrderItem/GetPrice?id=${+order.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setPrice(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function changeState() {
        let toUpdate = order
        toUpdate.state = 1
        fetch(`https://marketplace-backend-i22y.onrender.com/api/Order/${toUpdate.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(toUpdate)
        })
            .then(resp => resp)
            .then(data => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="shopping-cart">
            <div className="title">
                Order in progress
            </div>
            <div>
                {orderItems.length
                    ? orderItems.map(orderItem => (
                        <OrderItem key={orderItem.id} orderItem={orderItem} history={history}/>
                    )) : <></>
                }
            </div>
            <div className="finish-order">
                <span>Total price: {new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'USD',
                }).format(price)}</span>
                {!history ? <></>
                    : <button onClick={changeState}>Buy</button>
                }
            </div>
        </div>
    )
}

export default CartOrder