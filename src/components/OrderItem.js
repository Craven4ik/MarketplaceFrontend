import {useEffect, useState} from "react";


const OrderItem = ({orderItem}) => {
    const [item, setItem] = useState()

    useEffect(() => {
        // setOrderItems(order.orderItems)
        fetch(`https://localhost:7122/api/Item/GetItemById?id=${orderItem.productID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(window.localStorage.getItem("UserID"))
                console.log(data)
                // setOrders(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

  return (
      <div key={orderItem.id}>

      </div>
  )
}

export default OrderItem