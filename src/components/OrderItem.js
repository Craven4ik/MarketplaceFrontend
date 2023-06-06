import {useEffect, useState} from "react";
import deleteSvg from "../image/delete.svg"
import plusSvg from "../image/plus.svg"
import minusSvg from "../image/minus.svg"

const OrderItem = ({orderItem, history}) => {
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)

    let toUpdate = {
        count: orderItem.count,
        id: orderItem.id,
        orderID: orderItem.orderID,
        productID: orderItem.productID
    }

    useEffect(() => {
        setLoading(true)
        fetch(`https://marketplace-backend-i22y.onrender.com/api/Item/GetItemById?id=${+orderItem.productID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setItem(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [orderItem])

    function deleteItem() {
        fetch(`https://marketplace-backend-i22y.onrender.com/api/OrderItem/${orderItem.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
            .then(resp => resp)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        window.location.reload()
    }

    function plusCount() {
        toUpdate.count = orderItem.count + 1
        fetch(`https://marketplace-backend-i22y.onrender.com/api/OrderItem/${orderItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(toUpdate)
        })
            .then(resp => resp)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        window.location.reload()
    }

    function minusCount() {
        if (orderItem.count === 1) {
            deleteItem()
        }
        else {
            toUpdate.count = orderItem.count - 1
            fetch(`https://marketplace-backend-i22y.onrender.com/api/OrderItem/${orderItem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify(toUpdate)
            })
                .then(resp => resp)
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        window.location.reload()
    }

  return (
      loading
          ? <></>
          :
          <div>
              <div className="item">
                  {!history ? <></>
                      :
                      <div className="buttons">
                          <button className="delete-button" onClick={deleteItem}>
                              <img className="delete-btn" src={deleteSvg}/>
                          </button>
                      </div>
                  }

                  <div className="image">
                      <img src={item.image} alt=""/>
                  </div>

                  <div className="description">
                      <span>{item.name}</span>
                      <span>{item.description}</span>
                      <span>Owner: {item.ownerEmail}</span>
                  </div>

                  {!history ? <></>
                      :
                      <div className="quantity">
                          <button className="delete-button" type="button" name="button" onClick={plusCount}>
                              <img className="delete-btn" src={plusSvg} alt=""/>
                          </button>
                          <input type="text" name="name" value={orderItem.count}></input>
                              <button className="delete-button" type="button" name="button" onClick={minusCount}>
                                  <img className="delete-btn" src={minusSvg} alt=""/>
                              </button>
                      </div>
                  }

                  <div className="total-price">
                      {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'USD',
                      }).format(item.price)}
                  </div>
              </div>
              <hr />
          </div>
  )
}

export default OrderItem